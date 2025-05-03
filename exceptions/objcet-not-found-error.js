const CustomError = require('./custom-error');

class ObjectNotFoundError extends CustomError {
  constructor(errorCode, message) {
    super('ObjectNotFoundError', 404, errorCode || 'PA-00001', message || 'Object not found');
  }
}

module.exports = ObjectNotFoundError;
