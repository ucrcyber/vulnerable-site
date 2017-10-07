'use strict'

const Sequelize = require('sequelize')
const db = require('../lib/db')

const NewsItem = db.define('newsItem', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  month: Sequelize.STRING,
  day: Sequelize.STRING
})

module.exports = NewsItem
