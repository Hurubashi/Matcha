const BaseAction = require('../BaseAction')
const UsersModel = require('../../models/UsersModel')

/**
 * @description return users list
 */
class ListAction extends BaseAction {

  static get validationRules () {
    return {
      body: this.joi.object().keys({
        refreshToken: this.joi.string().required()
      })
    }
}

  static async run (req) {
    const { query } = req
    const data = await UsersModel.getList({ ...query })
    return data
  }
}

module.exports = ListAction
