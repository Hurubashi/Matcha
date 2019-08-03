const BaseModel = require('../core/BaseModel')
const Joi = require('joi')

class UsersModel extends BaseModel {

  static get tableName () {
    return 'users'
  }

  static get errorList (){
    return {
        'users_email_unique' : 'This email is already taken',
        'users_username_unique' : 'This username is already taken'
    }
}

  static get schema() {
    return Joi.object({
      email: Joi.string().email(),
      username: Joi.string().alphanum().min(3).max(16).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
      first_name: Joi.string().min(2).max(16),
      last_name: Joi.string().min(2).max(16)
    })
  }

  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */


}

module.exports = UsersModel
