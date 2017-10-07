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
  }
}
