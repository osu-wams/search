const { randomUUID } = require('node:crypto');
const {
  SecretsManagerClient,
  CreateSecretCommand,
  DescribeSecretCommand,
  GetSecretValueCommand,
  ListSecretsCommand,
  RotateSecretCommand,
  UpdateSecretCommand,
  UpdateSecretVersionStageCommand,
} = require('@aws-sdk/client-secrets-manager');
const {
  APIGEE_TOKEN_SECRET_NAME,
  APIGEE_API_SECRET_NAME,
  AWS_REGION,
  APIGEE_TOKEN_LAMBDA_ROTATION_ARN,
} = require('../constants');

/* Secrets Manager Rotation Template

This is a template for creating an AWS Secrets Manager rotation lambda

Args:
  event (object): Lambda object of event parameters. These keys must include the following:
    - SecretId: The secret ARN or identifier
    - ClientRequestToken: The ClientRequestToken of the secret version
    - Step: The rotation step (one of createSecret, setSecret, testSecret, or finishSecret)

  context (LambdaContext): The Lambda runtime information
*/
exports.handler = async (event, context) => {
  const arn = `arn:aws:secretsmanager:us-west-2:784417831348:secret:${APIGEE_TOKEN_SECRET_NAME}`;
  const token = randomUUID();

  // Setup the client
  const client = new SecretsManagerClient({
    region: AWS_REGION
  });

  // check if secret exists and create it if it does not
  await createSecret(client, arn, token);
  const metadata = await client.send(new DescribeSecretCommand({ SecretId: arn }));
  if (!metadata.RotationEnabled) {
    enableRotation(client, arn);
  }

  const data = await getToken();
  await client.send(
    new UpdateSecretCommand({
      SecretId: arn,
      ClientRequestToken: token,
      SecretString: JSON.stringify({ Token: data }),
    })
  );
  await testSecret(client, arn, token);
};

/* Create the secret

This method first checks for the existence of a secret for the passed in token. If one does not exist, it will generate a
new secret and put it with the passed in token.

Args:
  client (client): The secrets manager service client
  arn (string): The secret ARN or other identifier
  token (string): The ClientRequestToken associated with the secret version
*/
const createSecret = async (client, arn, token) => {
  try {
    const { SecretList: secretList } = await client.send(new ListSecretsCommand({
      Filters: [
        {
          Key: 'name',
          Values: [
            APIGEE_TOKEN_SECRET_NAME
          ]
        },
      ]
    }));
    if (secretList.length === 0) {
      await client.send(new CreateSecretCommand({ Name: APIGEE_TOKEN_SECRET_NAME }));
      enableRotation(client, arn);
      console.log(`createSecret: Successfully put secret for ARN ${arn} and version ${token}.`);
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

const enableRotation = async (client, arn) => {
  await client.send(new RotateSecretCommand({
    SecretId: arn,
    RotationLambdaARN: APIGEE_TOKEN_LAMBDA_ROTATION_ARN,
    RotationRules: { AutomaticallyAfterDays: 365 },
  }));
}

/* Test the secret

This method should validate that the AWSPENDING secret works in the service that the secret belongs to . For example, if the secret
is a database credential, this method should validate that the user can login with the password in AWSPENDING and that the user has
all of the expected permissions against the database.

Args:
  client (client): The secrets manager service client
  arn (string): The secret ARN or other identifier
  token (string): The ClientRequestToken associated with the secret version
*/
const testSecret = async (client, arn, token) => {
  // This is where the secret should be tested against the service
  const data = await client
    .send(new GetSecretValueCommand({ SecretId: arn, VersionStage: 'AWSCURRENT' }))
    .catch(err => {
      logError(err);
      throw err;
    });
  let secret = undefined;
  if (data.SecretString) {
    secret = JSON.parse(data.SecretString);
  }
  await fetch(`https://api.oregonstate.edu/v1/locations?q=library`, {
    headers: { Authorization: `Bearer ${secret.Token}` },
  }).then(response => {
    if (!response.ok) {
      throw new Error(`OSU API request failed with status ${response.status}`);
    }
    return response.json();
  }).catch(err => {
    console.error(err);
    console.error("Couldn't retrieve data successfully");
    throw err;
  });
  console.log(`testSecret: Successfully tested secret for ARN ${arn} and version ${token}.`);
};

const finishSecret = async (client, arn, token) => {
  /* Finish the secret

  This method finalizes the rotation process by marking the secret version passed in as the AWSCURRENT secret.

  Args:
    client (client): The secrets manager service client
    arn (string): The secret ARN or other identifier
    token (string): The ClientRequestToken associated with the secret version
  */
  // First describe the secret to get the current version
  const metadata = await client.send(new DescribeSecretCommand({ SecretId: arn }));
  const currentVersion = Object.keys(metadata.VersionIdsToStages).find(key =>
    metadata.VersionIdsToStages[key].includes('AWSCURRENT')
  );
  if (currentVersion === token) {
    // The correct version is already marked as current, return
    console.log(`finishSecret: Version ${currentVersion} already marked as AWSCURRENT for ${arn}`);
    return;
  }
  // Finalize by staging the secret version current
  await client.send(
    new UpdateSecretVersionStageCommand({
      SecretId: arn,
      VersionStage: 'AWSCURRENT',
      MoveToVersionId: token,
      RemoveFromVersionId: currentVersion,
    })
  );
  console.log(
    `finishSecret: Successfully set AWSCURRENT stage to version ${token} for secret ${arn}.`
  );
};

const getToken = async () => {
  const creds = JSON.parse(await getCreds());
  // A URLSearchParams body is sent as application/x-www-form-urlencoded
  const response = await fetch('https://api.oregonstate.edu/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: creds.key,
      client_secret: creds.secret,
      grant_type: 'client_credentials',
    }),
  });
  if (!response.ok) {
    throw new Error(`OSU token request failed with status ${response.status}`);
  }
  const result = await response.json();
  return result.access_token;
};

const getCreds = async () => {
  // Use this code snippet in your app.
  // If you need more information about configurations or implementing the sample code, visit the AWS docs:
  // https://aws.amazon.com/developers/getting-started/nodejs/
  const region = 'us-west-2';

  // Create a Secrets Manager client
  const client = new SecretsManagerClient({
    region: AWS_REGION
  });

  // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
  // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  // We rethrow the exception by default.
  const data = await client
    .send(new GetSecretValueCommand({ SecretId: APIGEE_API_SECRET_NAME }))
    .catch(err => {
      logError(err);
      throw err;
    });
  if (data.SecretString) {
    return data.SecretString;
  }
  // SecretBinary is returned already decoded, as a Uint8Array
  const buff = Buffer.from(data.SecretBinary);
  return buff.toString('ascii');
};

const logError = err => {
  if (err.name === 'DecryptionFailure') {
    console.error('Failed with DecryptionFailure');
    console.error(
      "Secrets Manager can't decrypt the protected secret text using the provided KMS key."
    );
    // Deal with the exception here, and/or rethrow at your discretion.
  } else if (err.name === 'InternalServiceError') {
    console.error('Failed with InternalServiceError');
    console.error('An error occurred on the server side.');
    // Deal with the exception here, and/or rethrow at your discretion.
  } else if (err.name === 'InvalidParameterException') {
    console.error('Failed with InvalidParameterException');
    console.error('You provided an invalid value for a parameter.');
    // Deal with the exception here, and/or rethrow at your discretion.
  } else if (err.name === 'InvalidRequestException') {
    console.error('Failed with InvalidRequestException');
    console.error(
      'You provided a parameter value that is not valid for the current state of the resource.'
    );
    // Deal with the exception here, and/or rethrow at your discretion.
  } else if (err.name === 'ResourceNotFoundException') {
    console.error('Failed with ResourceNotFoundException');
    console.error("We can't find the resource that you asked for.");
    // Deal with the exception here, and/or rethrow at your discretion.
  } else {
    console.error(`Unrecognized error: ${err.name}`);
  }
};
