const axios = require('axios')
const querystring = require('querystring')
const Router = require('express').Router
const { cognito_client_id, cognito_client_secret, cognito_redirect_uri, cognito_base_url } = require('../../../../config');


module.exports = Router({ mergeParams: true })
  .post('/v1/auth/token', async (req, res, next) => {
    try {
      const code = req.body.code || false;
      if (code) {
        const response = await axios({
          method: 'POST',
          url: `${cognito_base_url}/oauth2/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(`${cognito_client_id}:${cognito_client_secret}`).toString('base64')
          },
          data: querystring.stringify(getRequestParameters(code))
        });
        res.json(response.data);
      } else {
        res.status(400).json({ error: 'code parameter missing' })
      }
    } catch (error) {
      next(error)
    }
  });

function getRequestParameters(code) {
  return {
    grant_type: 'authorization_code',
    code,
    redirect_uri: cognito_redirect_uri,
    client_id: cognito_client_id
  }
}
