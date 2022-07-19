const express = require('express')
const router = express.Router()
const googleApi = require("../utils/google-api")

router.get('/login', (req, res, next) => {
    res.render('login', {title: 'Login'})
})

module.exports = router