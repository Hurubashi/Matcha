const BaseAction = require('../BaseAction')
const UsersModel = require('../../models/UsersModel')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

/**
 * @description return users list
 */
class CreateAction extends BaseAction {
    
  
    static async run (req) {

        let result = undefined;
        Joi.validate(req.body, UsersModel.schema, (err, value) => {
            if (err) {
                result = err.details
            } else {

                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    // Store hash in your password DB.
                    if (!err){
                        req.body.password = hash
                        UsersModel.create(req.body).catch(function (error){
                            if(error) {
                                result = {result: error.code}
                            } else {
                                result = {result: this.tableName + 'successfully created'}
                            }
                        })
                    }
                })

            }
        })

    }
}

module.exports = CreateAction


