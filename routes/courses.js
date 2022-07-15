const express = require("express");
const router = express.Router();
const googleApi = require("../helpers/google-api")

router.get("/", async (req, res, next) => {
  if (!req.session.tokens) {
    res.redirect("/");
  }

  const courses = await googleApi.getCourses(req.session.tokens)
  res.render('courses', {courses: courses})

})

module.exports = router