require('dotenv').config()
require('./globals')()

const Knex = require('knex')

const Server = require('./core/Server')
const controllers = require('./controllers')
const config = require('./config')

new Server({
    port: config.app.port,
    host: config.app.host,
    controllers,
    // middlewares,
  }).then(serverParams => {
    __logger.trace('Server initialized...', serverParams)
    __logger.info('--- Configs ---')
    __logger.info('App config:', config.app)
  }).catch(error => __logger.error('Server fails to initialize...', error))
    .then(() => testDbConnection(Knex(config.knex)))
    .then(() => {
      __logger.info('--- Database ---')
      __logger.info('Database initialized...', config.knex)
    }).catch(error => {
      __logger.error('Database fails to initialize...', error)
      process.exit(1)
    })


  async function testDbConnection (knexInstance) {

    try {
      await knexInstance.raw('select 1+1 as result')
    } finally {
      knexInstance.destroy()
    }
  }
