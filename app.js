'use strict'

const express = require('express')
const config = require('config')
const handlebars = require('express-handlebars')

const logger = require('./lib/logger')
const db = require('./lib/db')
const passport = require('./lib/passport')
const dataGenerator = require('./lib/dataGenerator')

const User = require('./models/User')
const CreditReport = require('./models/CreditReport')
const app = express()

const indexRoute = require('./routes/index')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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

  dataGenerator.insertRandomData(1)

  app.listen(process.env.POST || config.get('site.port'), () => {
    logger.info('Listening on port', process.env.POST || config.get('site.port'))
  })
}

main()
