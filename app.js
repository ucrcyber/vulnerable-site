'use strict'

const express = require('express')
const config = require('config')
const handlebars = require('express-handlebars')

const logger = require('./lib/logger')
const db = require('./lib/db')
const dataGenerator = require('./lib/dataGenerator')

const User = require('./models/User')
const CreditReport = require('./models/CreditReport')
const app = express()

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const indexRoute = require('./routes/index')

app.use('/', indexRoute)

async function main () {
  await db.authenticate()
  logger.debug('DB connected successfully.')

  // Sync DB models
  await User.sync({ force: true })
  await CreditReport.sync({ force: true })

  dataGenerator.insertRandomData(100)

  app.listen(process.env.POST || config.get('site.port'), () => {
    logger.info('Listening on port', process.env.POST || config.get('site.port'))
  })
}

main()
