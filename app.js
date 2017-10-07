'use strict'

const express = require('express')
const config = require('config')
const handlebars = require('express-handlebars')

const logger = require('./lib/logger')
const utils = require('./lib/utils')
const db = require('./lib/db')
const passport = require('./lib/passport')
const dataGenerator = require('./lib/dataGenerator')

const User = require('./models/User')
const CreditReport = require('./models/CreditReport')
const NewsItem = require('./models/NewsItem')
const app = express()

const indexRoute = require('./routes/index')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')(config.get('session')))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))
app.use('/', indexRoute)

async function main () {
  await db.authenticate()
  logger.debug('DB connected successfully.')

  // Sync DB models
  await User.sync({ force: true })
  await CreditReport.sync({ force: true })
  await NewsItem.sync({ force: true })

  await dataGenerator.insertRandomData(config.get('fakeUsers'))
  await utils.insertDefaultUser()
  await utils.insertNewsItems()

  app.listen(process.env.PORT || config.get('site.port'), () => {
    logger.info('Listening on port', process.env.PORT || config.get('site.port'))
  })
}

main()
