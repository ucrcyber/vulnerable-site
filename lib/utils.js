'use strict'

const crypto = require('crypto')
const config = require('config')

const User = require('../models/User')
const NewsItem = require('../models/NewsItem')

module.exports = {
  md5 (pass) {
    return crypto.createHash('md5')
      .update(pass)
      .digest('hex')
  },

  async insertDefaultUser () {
    if (!config.get('addDefaultUser')) return
    await User.create(config.get('defaultUser'))
  },

  async insertNewsItems () {
    await NewsItem.bulkCreate(config.get('newsItems'))
  }
}
