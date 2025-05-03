const CustomError = require('./custom-error');

class AuthenticationFailedError extends CustomError {
  constructor(errorCode, message) {
    super('AuthenticationFailedError', 401, errorCode || 'PA-00005', message || 'Authentication failed');
  }
}

module.exports = AuthenticationFailedError;
