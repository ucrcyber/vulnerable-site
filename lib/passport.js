'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')

const utils = require('./utils')
const db = require('./db')

passport.use(new Strategy(
  async (username, password, cb) => {
    const hashedPass = utils.md5(password)  // Side effect: prevents SQL injection in password field
    // Allow SQL injection in username variable
    const data = await db.query(`SELECT FROM users WHERE username = '${username}' AND password = '${hashedPass}'`)
    console.log(data)
    if (!data) {
      return cb(null, false)
    }
    return cb(null, data)
  }))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((serialized, cb) => {
  cb(null, serialized)
})

module.exports = passport
