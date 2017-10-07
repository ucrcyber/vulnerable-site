'use strict'

const Sequelize = require('sequelize')
const db = require('../lib/db')

const User = db.define('user', {
  id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,  // Hash with md5 to make it less secure
  ssn: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  zip: Sequelize.STRING
})

module.exports = User
