'use strict'

const express = require('express')
const config = require('config')
const handlebars = require('express-handlebars')

const logger = require('./lib/logger')

const app = express()

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const indexRoute = require('./routes/index')

app.use('/', indexRoute)

app.listen(process.env.POST || config.get('site.port'), () => {
  logger.info('Listening on port', process.env.POST || config.get('site.port'))
})
