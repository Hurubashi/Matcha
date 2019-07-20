// const errorCodes = require('../config/errorCodes')
require('dotenv').config()
const knex = require('knex')
const config = require('./../config')
knex(config.knex)

class BaseModel {
  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */


  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */

  static baseCreate (entity) {
    /**
     * each entity that creates must to have creator id (userId)
     * except user entity
     */

    return this.query().insert(entity)
  }

  static async baseGetList ({ page, limit, filter }) {

    return knex.raw('select * from user')
    
    // const data = await this.query()
    //   .where({ ...filter })
    //   .orderBy('id', 'desc')
    //   .page(page, limit)
    // if (!data.results.length) throw this.emptyListResponse()
    // return data
  }

  static async baseGetCount (filter = {}) {

    const result = await this.query()
      .where({ ...filter })
      .count('*')
      .first()
    if (!result.count) return 0
    return Number(result.count)
  }

  static async baseGetById (id) {

    const data = await this.query().findById(id)
    if (!data) throw this.errorEmptyResponse()
    return data
  }

  static baseUpdate (id, entity) {

    return this.query().patchAndFetchById(id, entity)
  }
  
  static baseRemove (id) {
    return this.query().deleteById(id)
  }

  static baseRemoveWhere (where = {}) {

    return this.query().delete().where({ ...where })
  }
}

module.exports = BaseModel
