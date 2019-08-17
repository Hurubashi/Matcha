const config    = require('./../config')
const Knex      = require('knex')(config.knex)

class BaseModel {

    get knex() {
        return Knex
    }

    static get tableName() {
      throw new Error(`${this.name} should implement 'tablename' method.`)
    }

    static async create(entity) {
      return Knex(this.tableName).insert(entity)
    }
  
    static async getList({ page, limit, filter}) {
      return Knex.select("*").from(this.tableName)
    }
  
    static async getCount(filter = {}) {
  
    }
  
    static async getWhere(params) {
      return Knex.select("*").from(this.tableName).where(params)
    }
  
    static update(id, entity) {
      return Knex(this.tableName).where('id', id).update(entity)
    }
    
    static remove(id) {
  
    }
  
    static removeWhere (where = {}) {
  
    }
}

module.exports = BaseModel