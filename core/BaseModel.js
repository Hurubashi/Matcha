const config = require('./../config')
const Knex = require('knex')(config.knex)

class BaseModel extends Knex {

    get knex() {
        return Knex
    }

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

module.exports = BaseModel