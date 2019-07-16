const app = require('./app')
const errorCodes = require('./errorCodes')
const knex = require('./knex')
const folders = require('./folders')
const roles = require('./roles')
// const email = require('./email')

module.exports = {
  app,
  errorCodes,
  knex,
  folders,
  roles,
//   email
}