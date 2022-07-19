const express = require('express')
const router = express.Router()
const googleApi = require("../utils/google-api")

// router.get('/', (req, res, next) => {
//     res.render('login', { title: 'Login' })
// })

router.get('/', async (req, res, next) => {
    if (req.query.code) {
      const tokens = await googleApi.getToken(req.query.code)
      req.session.tokens = tokens
      req.session.save(() => {
        res.redirect('/dashboard')
      })
    } else {
      res.render('login', { title: 'Login', loginUrl: googleApi.loginUrl() })
    }
  })

module.exports = router
