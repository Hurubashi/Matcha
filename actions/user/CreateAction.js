const BaseAction = require('../BaseAction')
const UserModel = require('../../models/UserModel')
const Joi = require('joi')

/**
 * @description return users list
 */
class CreateAction extends BaseAction {
  
    static async run (req) {
        console.log(req)

        let result = undefined
        Joi.validate(req.body, UserModel.schema, (err, value) => {
            if (err) {
                result = err.details
            }
            else {
                console.log('Before queue')
                UserModel.create(req.body)
                console.log('After queue')
                result = {result: value.username + 'successfully registered'}
            }
        });
        return result
    }
}

module.exports = CreateAction


