const CustomError = require('./custom-error');

class AlreadyExistsError extends CustomError {
  constructor(errorCode, message) {
    super('AlreadyExistsError', 409, errorCode || 'PA-00002', message || 'Resource already exists');
  }
}

module.exports = AlreadyExistsError;
