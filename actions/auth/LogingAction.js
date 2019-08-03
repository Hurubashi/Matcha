const BaseAction = require('../BaseAction')
// const UsersModel = require('../../models/UsersModel')
// const Joi = require('joi')
const bcrypt = require('bcrypt')

const saltRounds = 10;

/**
 * @description return users list
 */
class CreateAction extends BaseAction {
    
    static async run (req) {

    }

}

module.exports = CreateAction


