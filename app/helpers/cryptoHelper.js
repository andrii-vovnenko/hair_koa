const crypto = require('crypto');

const createFileName = (modelColorId) =>
  `${crypto.createHash('md5').update(modelColorId).digest('base64')}${crypto.randomBytes(5)}`;

module.exports = {
  createFileName,
}
