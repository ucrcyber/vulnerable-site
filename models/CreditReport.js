'use strict'

const Sequelize = require('sequelize')
const db = require('../lib/db')
const User = require('./User')

const CreditReport = db.define('creditReport', {
  id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  cardNumber: Sequelize.STRING,
  expires: Sequelize.STRING,
  creditScore: Sequelize.INTEGER
})

CreditReport.belongsTo(User)

module.exports = CreditReport
