'use strict';

class MyError extends Error {
  constructor(name, statusCode, message) {
    super(message);
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
  }
}

let error = {};

error._200 = (message = 'Failure') => {
  return new MyError('SuccessError', 200, message);
};

error._400 = (message = 'Bad Request') => {
  return new MyError('BadRequestError', 400, message);
};

error._401 = (message = 'Unauthorized') => {
  return new MyError('UnauthorizedError', 401, message);
};

error._402 = (message = 'Payment Required') => {
  return new MyError('PaymentRequiredError', 402, message);
};

error._403 = (message = 'Forbidden') => {
  return new MyError('ForbiddenError', 403, message);
};

error._404 = (message = 'Not Found') => {
  return new MyError('NotFoundError', 404, message);
};

error._409 = (message = 'Conflict') => {
  return new MyError('ConflictError', 409, message);
};

error._429 = (message = 'Too Many Requests') => {
  return new MyError('TooManyRequestsError', 429, message);
};

error._500 = (message = 'Internal Server Error') => {
  return new MyError('InternalServerError', 500, message);
};

error._503 = (message = 'Service Unavailable') => {
  return new MyError('ServiceUnavailableError', 503, message);
};


module.exports = error;