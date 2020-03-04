const Router = require('express').Router

module.exports = Router({mergeParams: true})
.get('/v1/auth/token', async (req, res, next) => {
    try {
        res.json({ working: 'token'})
    } catch (error) {
        next(error)
    }
  });
