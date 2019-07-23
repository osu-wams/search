const AWS = require('aws-sdk');
const request = require('request-promise');
const uuidv1 = require('uuid/v1');

exports.handler = async (event, context) => {
  /* Secrets Manager Rotation Template

  This is a template for creating an AWS Secrets Manager rotation lambda

  Args:
    event (object): Lambda object of event parameters. These keys must include the following:
      - SecretId: The secret ARN or identifier
      - ClientRequestToken: The ClientRequestToken of the secret version
      - Step: The rotation step (one of createSecret, setSecret, testSecret, or finishSecret)

    context (LambdaContext): The Lambda runtime information
  */
  /*
  const arn = event.SecretId;
  const token = event.ClientRequestToken;
  const step = event.Step;
  */
  const arn = 'arn:aws:secretsmanager:us-west-2:784417831348:secret:osusearch/apigeeToken-YYiuxe';
  const token = uuidv1();
  const region = 'us-west-2';

  // Setup the client
  const client = new AWS.SecretsManager({
    region: region
  });

  // Make sure the version is staged correctly
  const metadata = await client.describeSecret({ SecretId: arn }).promise();
  if (!metadata.RotationEnabled) {
    console.error(`Secret ${arn} is not enabled for rotation!`);
    return;
  }
  /*
  const versions = metadata.VersionIdsToStages;
  if (!versions[token]) {
    console.error(`Secret version ${token} has no stage for rotation of secret ${arn}.`);
    return;
  }
  if (versions[token][0] === 'AWSCURRENT') {
    console.error(`Secret version ${token} already set as AWSCURRENT for secret ${arn}.`);
    return;
  } else if (versions[token][0] !== 'AWSPENDING') {
    console.error(`Secret version ${token} not set as AWSPENDING for rotation of secret ${arn}.`);
    return;
  }

  if (step === 'createSecret') {
    await createSecret(client, arn, token);
  } else if (step === 'setSecret') {
    setSecret(client, arn, token);
  } else if (step === 'testSecret') {
    await testSecret(client, arn, token);
  } else if (step === 'finishSecret') {
    await finishSecret(client, arn, token);
  } else {
    console.error('Invalid step parameter');
  }
  */
  // Make sure the current secret exists
  await client.getSecretValue({ SecretId: arn, VersionStage: 'AWSCURRENT' }).promise();
  const data = await getToken();
  await client
    .updateSecret({ SecretId: arn, ClientRequestToken: token, SecretString: `{"Token":"${data}"}` })
    .promise();
  await testSecret(client, arn, token);
};

const createSecret = async (client, arn, token) => {
  /* Create the secret

  This method first checks for the existence of a secret for the passed in token. If one does not exist, it will generate a
  new secret and put it with the passed in token.

  Args:
    client (client): The secrets manager service client
    arn (string): The secret ARN or other identifier
    token (string): The ClientRequestToken associated with the secret version
  */
  // Make sure the current secret exists
  await client.getSecretValue({ SecretId: arn, VersionStage: 'AWSCURRENT' }).promise();
  // Now try to get the secret version, if that fails, put a new secret
  try {
    await client.getSecretValue({ SecretId: arn, VersionStage: 'AWSPENDING' }).promise();
  } catch (err) {
    if (err.code === 'ResourceNotFoundException') {
      // Generate a new password
      const data = await getToken();
      // Put the secret
      await client
        .putSecretValue({
          SecretId: arn,
          ClientRequestToken: token,
          SecretString: `{"Token":"${data}"}`,
          VersionStages: ['AWSPENDING']
        })
        .promise();
      console.log(`createSecret: Successfully put secret for ARN ${arn} and version ${token}.`);
    } else {
      console.error(err);
      return err;
    }
  }
};

const setSecret = (client, arn, token) => {
  /* Set the secret

  This method should set the AWSPENDING secret in the service that the secret belongs to. For example, if the secret is a database
  credential, this method should take the value of the AWSPENDING secret and set the user's password to this value in the database.

  Args:
    client (client): The secrets manager service client
    arn (string): The secret ARN or other identifier
    token (string): The ClientRequestToken associated with the secret version
  */
  // This is where the secret should be set in the service
  // For our use case, this function doesn't do anything
  console.log(`setSecret: Successfully set secret for ARN ${arn} and version ${token}.`);
};

const testSecret = async (client, arn, token) => {
  /* Test the secret

  This method should validate that the AWSPENDING secret works in the service that the secret belongs to . For example, if the secret
  is a database credential, this method should validate that the user can login with the password in AWSPENDING and that the user has
  all of the expected permissions against the database.

  Args:
    client (client): The secrets manager service client
    arn (string): The secret ARN or other identifier
    token (string): The ClientRequestToken associated with the secret version
  */
  // This is where the secret should be tested against the service
  const data = await client
    .getSecretValue({ SecretId: arn, VersionStage: 'AWSCURRENT' })
    .promise()
    .catch(err => {
      logError(err);
      throw err;
    });
  let secret = undefined;
  if (data.SecretString) {
    secret = JSON.parse(data.SecretString);
  }
  await request({
    method: 'GET',
    url: `https://api.oregonstate.edu/v1/locations?q=library`,
    auth: { bearer: secret.Token },
    json: true
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
  const metadata = await client.describeSecret({ SecretId: arn }).promise();
  const currentVersion = Object.keys(metadata.VersionIdsToStages).find(key =>
    metadata.VersionIdsToStages[key].includes('AWSCURRENT')
  );
  if (currentVersion === token) {
    // The correct version is already marked as current, return
    console.log(`finishSecret: Version ${currentVersion} already marked as AWSCURRENT for ${arn}`);
    return;
  }
  // Finalize by staging the secret version current
  await client
    .updateSecretVersionStage({
      SecretId: arn,
      VersionStage: 'AWSCURRENT',
      MoveToVersionId: token,
      RemoveFromVersionId: currentVersion
    })
    .promise();
  console.log(
    `finishSecret: Successfully set AWSCURRENT stage to version ${token} for secret ${arn}.`
  );
};

const getToken = async () => {
  const creds = JSON.parse(await getCreds());
  const result = await request({
    method: 'post',
    url: 'https://api.oregonstate.edu/oauth2/token',
    json: true,
    form: {
      client_id: creds.key,
      client_secret: creds.secret,
      grant_type: 'client_credentials'
    }
  });
  return result.access_token;
};

const getCreds = async () => {
  // Use this code snippet in your app.
  // If you need more information about configurations or implementing the sample code, visit the AWS docs:
  // https://aws.amazon.com/developers/getting-started/nodejs/
  const region = 'us-west-2';
  const secretName = 'osusearch/apigeeApi';

  // Create a Secrets Manager client
  const client = new AWS.SecretsManager({
    region: region
  });

  // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
  // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  // We rethrow the exception by default.
  const data = await client
    .getSecretValue({ SecretId: secretName })
    .promise()
    .catch(err => {
      logError(err);
      throw err;
    });
  if (data.SecretString) {
    return data.SecretString;
  }
  const buff = new Buffer(data.SecretBinary, 'base64');
  return buff.toString('ascii');
};

const logError = err => {
  if (err.code === 'DecryptionFailureException') {
    console.error('Failed with DecryptionFailureException');
    console.error(
      "Secrets Manager can't decrypt the protected secret text using the provided KMS key."
    );
    // Deal with the exception here, and/or rethrow at your discretion.
  } else if (err.code === 'InternalServiceErrorException') {
    console.error('Failed with InternalServiceErrorException');
    console.error('An error occurred on the server side.');
    // Deal with the exception here, and/or rethrow at your discretion.
  } else if (err.code === 'InvalidParameterException') {
    console.error('Failed with InvalidParameterException');
    console.error('You provided an invalid value for a parameter.');
    // Deal with the exception here, and/or rethrow at your discretion.
  } else if (err.code === 'InvalidRequestException') {
    console.error('Failed with InvalidRequestException');
    console.error(
      'You provided a parameter value that is not valid for the current state of the resource.'
    );
    // Deal with the exception here, and/or rethrow at your discretion.
  } else if (err.code === 'ResourceNotFoundException') {
    console.error('Failed with ResourceNotFoundException');
    console.error("We can't find the resource that you asked for.");
    // Deal with the exception here, and/or rethrow at your discretion.
  } else {
    console.error(`Unrecognized error: ${err.code}`);
  }
};
