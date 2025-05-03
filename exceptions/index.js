const ValidationError = require('./validation-error');
const AuthorizationFailed = require('./authorization-failed-error');
const ObjectNotFoundError = require('./objcet-not-found-error');
const AlreadyExistsError = require('./already-exists-error');
const UnknownError =require('./unknown-error');
const ForbiddenError = require('./forbidden-error');
const AuthenticationFailed = require('./authentication-failed-error');

module.exports = Object.freeze({
  ValidationError,
  AuthorizationFailed,
  ObjectNotFoundError,
  AlreadyExistsError,
  UnknownError,
  ForbiddenError,
  AuthenticationFailed,
});
