/**
 ******************************
 ******************************
 ******************************
 * Globals is anti pattern
 * Use it very careful
 ******************************
 ******************************
 ******************************
 */

const config = require('./config')

const logger = require('./util/logger')
const serverRoute = 'http://' + config.app.host + ":" + config.app.port

module.exports = () => {
  global.__logger = logger,
  global.__serverRoute = serverRoute
}
