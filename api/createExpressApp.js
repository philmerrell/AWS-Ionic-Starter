const express = require('express')
const bodyParser = require('body-parser')
// const expressWinston = require('express-winston')
const router = require('./routes/createRouter.js')()
const database = require('./database/createDatabase.js')()
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { client_domain_name } = require('./config');

module.exports = () => express()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    req.base = `${req.protocol}://${req.get('host')}`
    // req.logger = logger
    req.db = database
    return next()
  })
  .use(awsServerlessExpressMiddleware.eventContext())
  .use(function (req, res, next) {
    var allowedOrigins = [ 'http://localhost:8100', 'https://starter.philmerrell.com' ];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    res.header("X-Frame-Options", "SAMEORIGIN")
    res.header("X-Content-Type-Options", "nosniff")
    res.header("Content-Security-Policy", "default-src 'self'")
    res.header("Feature-Policy", "sync-xhr 'self'")
    res.header("Referrer-Policy", "no-referrer")
    next()
  })
  .use(express.static('./public'))
  .use('/api', router)
  .use((error, req, res, next) => {
    console.log('Error: ', error)
    res.status(error.status || 500).json({ error })
  })