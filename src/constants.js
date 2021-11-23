import { ENV } from './config';

const LAMBDA_API_URL = ENV === 'prod'
  ? 'https://ne2vbpr3na.execute-api.us-west-2.amazonaws.com/prod'
  : 'https://c6708yl9qk.execute-api.us-west-2.amazonaws.com/dev';

export {
  LAMBDA_API_URL,
}
