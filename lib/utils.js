'use strict'

const crypto = require('crypto')

module.exports = {
  md5 (pass) {
    return crypto.createHash('md5')
      .update(pass)
      .digest('hex')
  }
}
