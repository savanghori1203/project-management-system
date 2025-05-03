const CustomError = require('./custom-error');

class UnknownError extends CustomError {
  constructor(errorCode, message) {
    super('UnknownError', 500, errorCode || 'PA-00003', message || 'Something went wrong');
  }
}

module.exports = UnknownError;
