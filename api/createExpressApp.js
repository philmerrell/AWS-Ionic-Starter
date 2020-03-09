const express = require('express')
const bodyParser = require('body-parser')
// const expressWinston = require('express-winston')
const router = require('./routes/createRouter.js')()
const database = require('./database/createDatabase.js')()
const helmet = require('helmet');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

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
.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    res.header("X-Frame-Options", "SAMEORIGIN")
    res.header("X-Content-Type-Options", "nosniff")
    next()
})
.use(express.static('./public'))
.use('/api', router)
.use(helmet())
.use((error, req, res, next) => {
    console.log('Error: ', error)
    res.status(error.status || 500).json({ error })
})