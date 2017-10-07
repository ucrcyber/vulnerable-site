'use strict'

module.exports = {
  db: {
    uri: 'sqlite://db.sqlite',
    options: {
      logging: false
    }
  },
  site: {
    port: 3000
  },
  session: {
    secret: '4e!HJS3kMZJvAFgb%',
    resave: false,
    saveUninitialized: false
  },
  defaultUser: {
    name: 'Will',
    username: 'will',
    password: '288927ad8b35930262e9993b92b2e6c9',
    ssn: '10',
    address: '400 Fake Rd.',
    city: 'Riverside',
    zip: '12931'
  },
  logger: {
    level: 'debug'
  }
}
