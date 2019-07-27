const BaseAction = require('../BaseAction')
const UsersModel = require('../../models/UsersModel')
const Joi = require('joi')

/**
 * @description return users list
 */
class CreateAction extends BaseAction {
  
    static async run (req) {
        console.log(req)

        let result = undefined
        Joi.validate(req.body, UsersModel.schema, (err, value) => {
            if (err) {
                result = err.details
            }
            else {
                console.log('Before queue')
                UsersModel.create(req.body)
                console.log('After queue')
                result = {result: value.username + 'successfully registered'}
            }
        });
        return result
    }
}

module.exports = CreateAction


