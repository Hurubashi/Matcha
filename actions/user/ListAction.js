const BaseAction = require('../BaseAction')
const UserModel = require('../../models/UserModel')

/**
 * @description return users list
 */
class ListAction extends BaseAction {
  static get accessTag () {
    return 'user:list'
  }

  static get validationRules () {
    return {
      query: this.joi.object().keys({
        ...this.baseQueryParams,
        filter: this.joi.object().keys({
          username: this.joi.string().min(3)
        })
      })
    }
  }

  static async run (req) {
    const { query } = req
    const data = await UserModel.baseGetList({ ...query })

    return data
  }
}

module.exports = ListAction
