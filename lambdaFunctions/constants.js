import { ENV } from './config'

const APIGEE_API_SECRET_NAME = 'osusearch/apigeeApi';
const APIGEE_TOKEN_SECRET_NAME = `osusearch-${ENV}/apigeeToken`;
// const APIGEE_TOKEN_SECRET_NAME = `osusearch-dev/apigeeToken`;
const AWS_REGION = 'us-west-2';

const APIGEE_TOKEN_LAMBDA_ROTATION_ARN = 'arn:aws:lambda:us-west-2:784417831348:function:osuSearch2-dev-updateApigeeToken';

const LAMBDA_API_URL = 'https://pdukc4i7p0.execute-api.us-west-2.amazonaws.com';

export {
  APIGEE_API_SECRET_NAME,
  APIGEE_TOKEN_SECRET_NAME,
  AWS_REGION,
  APIGEE_TOKEN_LAMBDA_ROTATION_ARN,
  LAMBDA_API_URL,
}
