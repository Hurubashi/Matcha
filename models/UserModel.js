const BaseModel = require('../core/BaseModel')
const Joi = require('joi')

class UserModel extends BaseModel {

  static get tableName () {
    return 'user'
  }

  static get schema() {
    return Joi.object({
      email: Joi.string().email(),
      username: Joi.string().alphanum().min(3).max(16).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
      firstname: Joi.string().min(2).max(16),
      lastname: Joi.string().min(2).max(16)
    }).with('username', 'password');
  }

// You can also pass a callback which will be called synchronously with the validation result.
static validate(req){
  return this.schema.validate({req}, function(err, value) {});
  // err === null -> valid
}

  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */

   static create(entity) {
     this.validate(entity.body)
     super.create()
     return entity
   }
}

module.exports = UserModel
