const BaseAction = require('../BaseAction')
const UserModel = require('../../models/UserModel')
const Joi = require('joi')

/**
 * @description return users list
 */
class CreateAction extends BaseAction {
  
    static async run (req) {
        // const { query } = req
        console.log(req)
        // const validationResult = UserModel.validate(req.body)

        let result = undefined
        Joi.validate(req.body, UserModel.schema, (err, value) => {
            if (err) {
                result = err.details
            }
            else {
                result = value.username + 'successfully registered'
            }
            // value.status === 'registered'
            // value.username === 'jane-doe'
            // value.created will be the time of validation
        });

        return result
        // if (validationResult === null) {
        //     // const data = await UserModel.create(req)    
        //     // return data
        //     return {valid : true}
        // } else {
        //     console.log('TARARAR')
        //     // return validationResult
        //     return {valid: false}
        // }
    }
}

module.exports = CreateAction


