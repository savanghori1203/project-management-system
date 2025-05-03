const CustomError = require('./custom-error');

class ValidationError extends CustomError {
  constructor(errorCode, message) {
    super('ValidationError', 400, errorCode || 'PA-00004', message || 'Validation failed');
  }
}

module.exports = ValidationError;
