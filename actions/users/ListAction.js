const BaseAction = require('../BaseAction')
const UsersModel = require('../../models/UsersModel')

/**
 * @description return users list
 */
class ListAction extends BaseAction {

  static async run (req) {
    const { query } = req
    return await UsersModel.getList({ ...query })
  }
}

module.exports = ListAction
