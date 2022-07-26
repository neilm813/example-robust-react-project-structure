const { request, response } = require('express');

/**
 * @see https://expressjs.com/en/guide/error-handling.html
 * @param {object | Error} error
 * @param {request} _req
 * @param {response} res
 * @param {Function} next
 */
const errorLogger = (error, _req, _res, next) => {
  console.log('errorLogger');
  console.error(error);
  return next(error);
};

/**
 * Catch-all error handler. Any error handling that needs to happen for
 * all errors can happen here.
 * @param {object | Error} error
 * @param {request} _req
 * @param {response} res
 */
const errorHandler = (error, _req, res, next) => {
  console.log('errorHandler');
  /* 
  'when you add a custom error handler, you must delegate to the default
  Express error handler, when the headers have already been sent to the client'
  */
  if (res.headersSent) {
    return next(error);
  }

  console.log('errorHandler responding');
  const err = { ...error };

  // Error instance properties won't show up in json unless added explicitly.
  if (error instanceof Error) {
    err.name = error.name;
    err.message = error.message;
  }

  // You can throw a custom error object with a statusCode on it to be handled.
  return res.status(err.statusCode || 500).json(err);
};

module.exports = { errorLogger, errorHandler };
