// See destination-controller createMany for example usage of ApiError

/**
 * A custom error that can be thrown as needed to be caught by middleware that
 * will set `res.status` based on the `statusCode`.
 */
export class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    /** To be used with `res.status` */
    this.statusCode = statusCode;

    // This makes the name of this error matches the class name.
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
