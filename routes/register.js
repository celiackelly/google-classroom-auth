const express = require('express')
const router = express.Router()
const googleApi = require("../utils/google-api")

router.get('/', (req, res, next) => {
    res.render('register', {title: 'Register'})
})

module.exports = router