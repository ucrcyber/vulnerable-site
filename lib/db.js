'use strict'

const Sequelize = require('sequelize')
const config = require('config')

const db = new Sequelize(config.get('db.uri'))

module.exports = db
