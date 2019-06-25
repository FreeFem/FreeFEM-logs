var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var getLogJobs = require('./routes/getLogJobs');
var getLogDirectories = require('./routes/getLogDirectories');
var getLogFiles = require('./routes/getLogFiles');
var getLogContent = require('./routes/getLogContent');
var getCoverageFile = require('./routes/getCoverageFile');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/getLogJobs', getLogJobs);
app.use('/getLogDirectories', getLogDirectories);
app.use('/getLogFiles', getLogFiles);
app.use('/getLogContent', getLogContent);
app.use('/getCoverageFile', getCoverageFile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({status: 'error'});
});

module.exports = app;