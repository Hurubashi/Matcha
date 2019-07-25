const BaseAction = require('../BaseAction')
const UserModel = require('../../models/UserModel')

/**
 * @description return users list
 */
class ListAction extends BaseAction {
  
    static async run (req) {
        const { query } = req
        const data = await UserModel.create({ ...query })    
        return data
    }
}

module.exports = ListAction


