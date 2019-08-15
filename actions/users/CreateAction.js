const BaseAction    = require('../BaseAction')
const UsersModel    = require('../../models/UsersModel')
const MailService   = require('../../services/MailService')
const bcrypt        = require('bcrypt')
const uuidv1        = require('uuid/v1')
const fs            = require('fs')

const saltRounds = 10;

/**
 * @description User creation
 */
class CreateAction extends BaseAction {
    
    static get validationRules () {
        return {
            body: this.joi.object().keys({
                email: this.joi.string().email().required(),
                username: this.joi.string().alphanum().min(3).max(16).required(),
                password: this.joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
                first_name: this.joi.string().min(2).max(16).required(),
                last_name: this.joi.string().min(2).max(16).required()
            })
          }

      }

    static async run(req) {

        req.body.password = await bcrypt.hash(req.body.password, saltRounds)

        try {
            // await UsersModel.create(req.body)

            let text = await fs.readFile('./public/letters/AccountCreated', 'utf8', function (res) {
                console.log(res)
            })
            // await MailService.sendMail(req.body.email, 'Account creation', uuidv1())
            return {

                result: UsersModel.tableName + text + 'successfully created' + text}
        } catch(err) {
            /**
             * Rotate
             */
            for (var key in UsersModel.errorList) {
                if (err.sqlMessage && err.sqlMessage.includes(key))
                    return {error: UsersModel.errorList[key]}
            }
            return {error: err ? err : 'Somethig went wrong'}
        }
    }

}

module.exports = CreateAction


