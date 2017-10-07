'use strict'

const config = require('config')
const logger = require('winston')

logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {colorize: true})

logger.default.transports.console.level = config.get('logger.level')

module.exports = logger
