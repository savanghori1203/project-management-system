const CustomError = require('./custom-error');

class ForbiddenError extends CustomError {
  constructor(errorCode, message) {
    super('ForbiddenError', 403, errorCode || 'PA-00007', message || 'Access to this resource is forbidden');
  }
}

module.exports = ForbiddenError;
