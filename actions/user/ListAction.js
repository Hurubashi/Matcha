const BaseAction = require('../BaseAction')
const UserModel = require('../../models/UserModel')

/**
 * @description return users list
 */
class ListAction extends BaseAction {
  static get accessTag () {
    return 'user:list'
  }

  static async run (req) {
    const { query } = req
    const data = await UserModel.getList({ ...query })

    return data
  }
}

module.exports = ListAction
