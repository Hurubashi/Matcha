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
    console.log('Server initialized...', serverParams)
    console.log('--- Configs ---')
    console.log('App config:', config.app)
  }).catch(error => console.log.error('Server fails to initialize...', error))
    .then(() => testDbConnection(Knex(config.knex)))
    .then(() => {
      console.log('--- Database ---')
      console.log('Database initialized...', config.knex)
    }).catch(error => {
      console.log('Database fails to initialize...', error)
      process.exit(1)
    })


  async function testDbConnection (knexInstance) {

    try {
      await knexInstance.raw('select 1+1 as result')
    } finally {
      knexInstance.destroy()
    }
  }
