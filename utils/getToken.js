const crypto = require('crypto');

function getToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = getToken;
