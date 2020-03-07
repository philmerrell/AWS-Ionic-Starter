const express = require('express')
const bodyParser = require('body-parser')
// const expressWinston = require('express-winston')
const router = require('./routes/createRouter.js')()
const database = require('./database/createDatabase.js')()
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
.use(express.static('./public'))
.use('/api', router)
.use((error, req, res, next) => {
    console.log('Error: ', error)
    res.status(error.status || 500).json({ error })
})