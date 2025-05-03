class CustomError extends Error {
    constructor(name, httpStatusCode, errorCode, message, ...params) {
      super(...params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
  
      this.name = name || 'CustomError';
      this.httpStatusCode = httpStatusCode || 500;
      this.errorCode = errorCode || 'EX-00000';
      this.message = message || 'Something went wrong';
      this.date = new Date();
    }
  }
  
  module.exports = CustomError;
  