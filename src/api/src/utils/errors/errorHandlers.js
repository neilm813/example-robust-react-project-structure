import { request, response } from 'express';

/**
 * @see https://expressjs.com/en/guide/error-handling.html
 * @param {object | Error} error
 * @param {request} _req
 * @param {response} res
 * @param {Function} next
 */
export const errorLogger = (error, _req, _res, next) => {
  console.error(error);
  return next(error);
};

/**
 * Catch-all error handler. Any error handling that needs to happen for
 * all errors can happen here.
 * @see [Section: 'The default error handler'](https://expressjs.com/en/guide/error-handling.html)
 * @param {object | Error} error
 * @param {request} _req
 * @param {response} res
 * @param {Function} next
 */
export const errorHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const errorData = { ...error };

  // Error instance properties won't show up in json unless added explicitly.
  if (error instanceof Error) {
    errorData.name = error.name;
    errorData.message = error.message;
  }

  // You can throw a custom error object with a statusCode on it to be handled.
  return res.status(errorData.statusCode || 500).json(errorData);
};
