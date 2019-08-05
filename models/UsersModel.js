const BaseModel = require('../core/BaseModel')

class UsersModel extends BaseModel {

  static get tableName() {
    return 'users'
  }

  static get errorList() {
    return {
        'users_email_unique' : 'This email is already taken',
        'users_username_unique' : 'This username is already taken'
    }
}

  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */


}

module.exports = UsersModel
