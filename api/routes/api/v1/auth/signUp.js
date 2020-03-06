const Router = require('express').Router

module.exports = Router({mergeParams: true})
.get('/v1/auth/signup', async (req, res, next) => {
    try {
        res.json({ working: 'true'})
    } catch (error) {
        next(error)
    }
  });
