const axios = require('axios')
const querystring = require('querystring')
const Router = require('express').Router
const { cognito_client_id, client_domain_name } = require('../../../../config');


module.exports = Router({ mergeParams: true })
  .get('/v1/auth/logout', async (req, res, next) => {
    try {
      const logoutUri = encodeURIComponent(client_domain_name);
      const logoutUrl = `${cognito_base_url}/logout?client_id=${cognito_client_id}&logout_uri=${logoutUri}`;
      res.status(301).redirect(logoutUrl);
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
