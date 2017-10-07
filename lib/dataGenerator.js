'use strict'

const crypto = require('crypto')
const Chance = require('chance')
const Promise = require('bluebird')

const User = require('../models/User')
const CreditReport = require('../models/CreditReport')

const chance = new Chance()

function md5 (pass) {
  return crypto.createHash('md5')
    .update(pass)
    .digest('hex')
}

module.exports = {
  randomUser () {
    return {
      name: chance.name(),
      username: chance.twitter().slice(1),
      password: md5(chance.word({ syllables: chance.integer({ min: 2, max: 4 }) })),
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
