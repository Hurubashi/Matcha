const BaseAction = require('../BaseAction')
const UsersModel = require('../../models/UsersModel')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const saltRounds = 10;

/**
 * @description User creation
 */
class CreateAction extends BaseAction {
    
    static async run (req) {

        await Joi.validate(req.body, UsersModel.schema, (err, value) => {
            if (err) {
                return {error: err.details}
            }
        })

        req.body.password = await bcrypt.hash(req.body.password, saltRounds)

        try {
            await UsersModel.create(req.body)
            return {result: UsersModel.tableName + ' ' + 'successfully created'}
        } catch(error) {

            let errorList = UsersModel.errorList

            for (var key in errorList) {
                if (error.sqlMessage.includes(key))
                    return {error: errorList[key]}
            }
        }
    }

}

module.exports = CreateAction


