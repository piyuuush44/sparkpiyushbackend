var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const appRoutes = require('./src/app/index');
const {isCelebrate} = require('celebrate');
const cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOption));
appRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const getErrorResponse = (httpStatus, message) => ({
  error: {
    httpStatus: httpStatus,
    message: message,
  },
});
// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  if (isCelebrate(err)) {
    if (err.joi.details && err.joi.details.length > 0) {
      res.status(400).send(getErrorResponse(400, err.joi.details[0].message));
    } else {
      res.status(400).send(getErrorResponse(400, 'Input validation error'));
    }
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).send(getErrorResponse(401, 'Unauthorized. Missing or invalid token'));
  } else {
    // If it is an uncaught exception, pass it back as an Internal Server Error
    res.status(500).send(getErrorResponse(500, 'Looks like something went wrong. Please wait and try again in a few minutes.'));
  }
});

module.exports = app;
