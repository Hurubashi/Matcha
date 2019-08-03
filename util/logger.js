const pino = require('pino')
const config = require('../config')

const fatalLogger = pino({
  name: `${config.app.name.toLowerCase()}::fatal`,
  errorLikeObjectKeys: ['err', 'error'],
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const errorLogger = pino({
  name: `${config.app.name.toLowerCase()}::error`,
  errorLikeObjectKeys: ['err', 'error'],
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const warnLogger = pino({
  name: `${config.app.name.toLowerCase()}::warn`,
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const infoLogger = pino({
  name: `${config.app.name.toLowerCase()}::info`,
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})

const traceLogger = pino({
  name: `${config.app.name.toLowerCase()}::trace`,
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})

module.exports = {
  fatal: (message, error, meta) => {

    fatalLogger.fatal(message, meta || error.toString())
  },

  error: (message, error, meta) => {

    errorLogger.error(message, meta || error.toString())
  },

  warn: (message, error, meta) => {

    warnLogger.warn(message, meta || error.toString())
  },

  trace: (message, meta) => {

    traceLogger.info(message, meta || {})
  },

  info: (message, log) => {

    infoLogger.info(message, log || '')
  }
}
