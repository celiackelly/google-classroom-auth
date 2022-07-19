const express = require("express");
const router = express.Router();
const googleApi = require("../utils/google-api")

router.get("/", async (req, res, next) => {
  if (!req.session.tokens) {
    res.redirect("/");
  }

  const courses = await googleApi.getCourses(req.session.tokens)
  res.render('dashboard', {title: 'Dashboard', courses: courses})

})

router.get("courses/:id", async (req, res, next) => {
  if (!req.session.tokens) {
    res.redirect("/");
  }

  const courseId = req.params.id
  console.log(courseId)

  const course = await googleApi.getCourse(req.session.tokens, courseId)

  const students = await googleApi.getCourseRoster(req.session.tokens, courseId)

  const studentNames = students.map(student => student.profile.name.fullName)

  res.render('course', { title: 'Course', course, studentNames })

})

module.exports = router