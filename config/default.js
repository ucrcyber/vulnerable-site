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
  fakeUsers: 10, // Number of fake users to add
  addDefaultUser: true,
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
  },
  newsItems: [
    {
      title: 'Mysterious satellite crash',
      body: 'A mysterious satellite crashed on top of the Radio Kaikan building in Akihabara at around noon.',
      month: 'July',
      day: '23'
    },
    {
      title: 'New high score',
      body: '『　』 has acheived the top score, with over 280 wins in a row.',
      month: 'June',
      day: '20'
    },
    {
      title: 'Local boy dies of shock',
      body: 'Satou Kazuma, a local boy, died of shock trying to save someone from a tractor.',
      month: 'Jan',
      day: '24'
    }
  ]
}
