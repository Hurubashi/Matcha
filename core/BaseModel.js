const config = require('./../config')
const Knex = require('knex')(config.knex)

class BaseModel {

    get knex() {
        return Knex
    }

    static get tableName () {
      throw new Error(`${this.name} should implement 'tablename' method.`)
    }

    static async create (entity) {
      return Knex(this.tableName).insert(entity)
    }
  
    static async getList ({ page, limit, filter}) {
      return Knew.select("*").from(this.tableName)
      .catch(function (error){
        console.error(error)
      })
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