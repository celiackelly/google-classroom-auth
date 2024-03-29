const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db') 

const indexRouter = require('./routes/index')
const dashboardRouter = require('./routes/dashboard')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const aboutRouter = require('./routes/about')

const app = express()
connectDB()

// view engine setup
app.set('view engine', 'ejs')
app.set('layout', './layouts/layout')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist/js'))
app.use(expressLayouts)
app.use(logger('dev'))
app.use(cors())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
}))

app.use('/', indexRouter)
app.use('/dashboard', dashboardRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/about', aboutRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
});

module.exports = app
