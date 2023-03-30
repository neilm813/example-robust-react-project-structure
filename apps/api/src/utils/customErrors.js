import mongoose from 'mongoose';

/**
 * Represents an error related to a model field.
 */
export class FieldError {
  constructor(fieldName, message, givenValue) {
    this.fieldName = fieldName;
    this.message = message;
    this.value = givenValue;
  }
}

/**
 * A custom error that can be thrown as needed to be caught by middleware that will set `res.status` based on the
 * `statusCode`.
 *
 * If you want to pass a caught error to `next()` with a status code, you can instantiate this class with the caught
 * error as the `cause`.
 *
 * @example
 * ```
 * catch (error) {
 *    const apiError = new ApiError({ message: "Failed to update database", statusCode: 500, cause: error });
 *    return next(apiError);
 * }
 * ```
 *
 * @example
 * ```
 * try {
 *    if (somethingBadIsTrue) {
 *      throw new ApiError({ message: "You did something bad.", statusCode: 400 });
 *    }
 * }
 * ```
 */
export class ApiError extends Error {
  constructor({ message, statusCode = 500, cause, code = 'API_ERROR' }) {
    if (cause instanceof Error) {
      super(typeof message === 'string' ? message : cause.message);
    } else {
      super(typeof message === 'string' ? message : 'Unexpected error.');
    }

    this.code = code;
    /** To be used with `res.status` */
    this.statusCode = statusCode;

    // This makes the name of this error matches the class name.
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * The built in Error instance when converted to json becomes an empty object `{}` so a `toJSON` method can be
   * added which, if present, will be used when this class is being converted to JSON.
   */
  toJSON() {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

/*
The normalized errors can only be created after you've seen the structure of the errors you are getting, either by
responding with them initially then re-structuring them after, or console logging them, or looking at the docs /
source code to see the structure of a libraries errors.
*/

/**
 * This class is to create a common structure for validation errors regardless of which database is used so that the
 * consumer of the api is always receiving the same validation error structure even if the api changes what type of
 * database it uses.
 *
 * If the database was changed, we would just add code that converts the new database's validation error structure into
 * this 'normalized' structure.
 */
export class NormalizedValidationError extends ApiError {
  constructor(error) {
    super({ message: error.message, statusCode: 400, cause: error, code: 'VALIDATION_ERROR' });

    this.errors = {};

    if (error instanceof mongoose.Error.ValidationError) {
      this.normalizeMongooseValidationError(error);
    } /* else if (error instanceof OtherDatabaseError) {
      this.normalizeOtherDatabaseError(error)
    } */
  }

  /**
   * @param {FieldError} fieldError
   */
  addFieldError(fieldError) {
    this.errors[fieldError.fieldName] = fieldError;
    return this;
  }

  /**
   * @param {import("mongoose").Error.ValidationError} mongooseValidationError
   */
  normalizeMongooseValidationError(mongooseValidationError) {
    Object.entries(mongooseValidationError.errors).forEach(([fieldName, fieldError]) => {
      const { message, value } = fieldError;

      // The Cast Error message should be more user-readable. Normally it looks like:
      // "Cast to ObjectId failed for value \"foo\" (type string) at path \"_id\" for model \"Destination\"
      const finalMessage = fieldError instanceof mongoose.Error.CastError ? 'invalid format' : message;

      // To make each error inside a validation error consistent, whether it's a FieldError or CastError they are both
      // converted to a normalized FieldError structure.
      this.addFieldError(new FieldError(fieldName, finalMessage, value));
    });
  }

  /**
   * See {@link ApiError.toJSON}
   */
  toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors,
    };
  }
}

/**
 * When cast error is part of a validation error it is converted to a validation error structure for consistency, but
 * a cast error can also happen alone, such as when an invalid id format is provided for a database query.
 */
export class NormalizedCastError extends ApiError {
  /**
   * @param {import("mongoose").Error.CastError} castError
   */
  constructor(castError) {
    super({ message: `${castError.value} is an invalid format`, statusCode: 400 });
  }
}

/**
 * Checks what instance of error was received and converts them into pre-defined structures so that in the event of
 * changing what database is used, the consumers of the api don't get wildly different error structures returned for
 * things like validation errors, for example.
 */
export const normalizeErrors = (error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return new NormalizedValidationError(error);
  }

  if (error instanceof mongoose.Error.CastError) {
    return new NormalizedCastError(error);
  }

  if (error instanceof ApiError) {
    return error;
  }

  // The error is a native Error or some other extended error not yet handled.
  return new ApiError({ cause: error });
};
