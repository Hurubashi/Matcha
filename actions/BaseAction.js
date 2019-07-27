const Joi = require('joi')

class BaseAction {
  static get joi () {
    return Joi
  }
  

}

module.exports = BaseAction
