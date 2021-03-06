'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')

const utils = require('./utils')
const db = require('./db')
const logger = require('./logger')
const User = require('../models/User')

passport.use(new Strategy(
  async (username, password, cb) => {
    try {
      logger.debug('Got credential set:', username, password)
      const hashedPass = utils.md5(password)  // Side effect: prevents SQL injection in password field
      // Allow SQL injection in username variable
      const data = await db.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${hashedPass}' LIMIT 1`)

      if (data[0].length > 0) {
        logger.debug(`Logged in as: ${data[0][0].name} using username: ${username}`)
        return cb(null, data[0][0])
      }

      return cb(null, false)
    } catch (err) {
      // Likely SQL injection attempt, ignore
      return cb(null, false)
    }
  }))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id)
    if (!user) return cb(new Error('User not found'))
    cb(null, user)
  } catch (err) {
    cb(err)
  }
})

module.exports = passport
