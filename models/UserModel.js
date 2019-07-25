const BaseModel = require('../core/BaseModel')

class UserModel extends BaseModel {

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

   
}

module.exports = UserModel
