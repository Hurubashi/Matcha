const BaseAction = require('../BaseAction')
// const UsersModel = require('../../models/UsersModel')
// const Joi = require('joi')
const bcrypt = require('bcrypt')

const saltRounds = 10;

/**
 * @description 
 */
class LoginAction extends BaseAction {
    
    static async run (req) {

    }

}

module.exports = LoginAction


