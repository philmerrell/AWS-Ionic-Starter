const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  env: process.env.NODE_ENV,
  cognito_base_url: process.env.COGNITO_BASE_URL,
  cognito_client_id: process.env.COGNITO_CLIENT_ID,
  cognito_redirect_uri: process.env.COGNITO_REDIRECT_URI,
  client_secret: process.env.COGNITO_CLIENT_SECRET,
  dynamo_table_name: process.env.DYNAMO_TABLE_NAME
};