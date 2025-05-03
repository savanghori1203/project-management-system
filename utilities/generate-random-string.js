const nanoid = require('nanoid/generate');

function generateRandomString(length = 8) {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
  return nanoid(alphabet, length);
}

module.exports = generateRandomString;
