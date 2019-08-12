require('dotenv').config()

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      socketPath : process.env.DB_SOCKET,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },


};
