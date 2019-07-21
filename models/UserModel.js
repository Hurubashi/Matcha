const config = require('./../config')
const Knex = require('knex')(config.knex)

class UserModel extends Knex {

  static get tableName () {
    return 'user'
  }

  static get jsonAttributes () {
    return ['refreshTokensMap']
  }

  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */

  static async create (entity) {
  }

  static async getList ({ page, limit, filter}) {
    return this.select("*").from(this.tableName)
  }

  static async getCount (filter = {}) {

  }

  static async getById (id) {
    
  }

  static update (id, entity) {

  }
  
  static remove (id) {

  }

  static removeWhere (where = {}) {

  }
}

module.exports = UserModel
