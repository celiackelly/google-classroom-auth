const express = require('express')
const router = express.Router()
const googleApi = require("../utils/google-api")

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (req.query.code) {
    const tokens = await googleApi.getToken(req.query.code)
    req.session.tokens = tokens
    req.session.save(() => {
      res.redirect('/dashboard')
    })
  } else {
    res.render('index', { title: 'Home' })
  }
})

module.exports = router
