const CustomError = require('./custom-error');

class AuthorizationFailedError extends CustomError {
  constructor(errorCode, message) {
    super('AuthorizationFailedError', 403, errorCode || 'PA-00006', message || 'Authorization failed');
  }
}

module.exports = AuthorizationFailedError;
