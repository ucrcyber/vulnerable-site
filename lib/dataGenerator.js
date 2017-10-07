'use strict'

const Chance = require('chance')
const Promise = require('bluebird')

const utils = require('./utils')
const User = require('../models/User')
const CreditReport = require('../models/CreditReport')

const chance = new Chance()

module.exports = {
  randomUser () {
    return {
      name: chance.name(),
      username: chance.twitter().slice(1),
      password: utils.md5(chance.word({ syllables: chance.integer({ min: 2, max: 4 }) })),
      ssn: chance.ssn(),
      address: chance.address(),
      city: chance.city(),
      zip: chance.zip()
    }
  },

  randomReport () {
    return {
      cardNumber: chance.cc(),
      expires: `${chance.exp_month()}/${chance.exp_year()}`,
      creditScore: chance.integer({ min: 10, max: 80 }) * 10
    }
  },

  async insertRandomData (number = 1) {
    const ops = []

    // Can't use bulkCreate because of relations
    for (let i = 0; i < number; ++i) {
      const report = this.randomReport()
      report.user = this.randomUser()
      ops.push(CreditReport.create(report, { include: User }))
    }
    return Promise.all(ops)
  }
}
