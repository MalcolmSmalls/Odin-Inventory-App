var createError = require('http-errors');
var express = require('express');
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://bigchop:RLqWGl1HqEUi91wp@cluster0.dxy87on.mongodb.net/inventory?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"))
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collectionRouter = require('./routes/collection')
// var collectionRouter = require('./routes/collection');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/collection', collectionRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

hbs.registerHelper('if_eq', function(a,b, opts) {
	if ( a == b ) {
		return opts.fn(this)
	} else {
		return opts.inverse(this)
	}
	

});

hbs.registerHelper('if_uneq', function(a,b, opts) {
	if ( a !== b ) {
		return opts.fn(this)
	} else {
		return opts.inverse(this)
	}
	

});
module.exports = app;
