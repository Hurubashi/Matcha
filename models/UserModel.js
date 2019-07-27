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
    })
  }

// You can also pass a callback which will be called synchronously with the validation result.
static validate(req){
  return Joi.validate(req, this.schema);
  // err === null -> valid
}

  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */

   static create(entity) {
    //  console.log('Body: ' + entity.body)
     let gg = 'validation: ' + JSON.stringify(this.validate(entity.body))
     console.log(gg)
     super.create()
     return entity.body
   }
}

module.exports = UserModel
