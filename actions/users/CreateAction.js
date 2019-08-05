const BaseAction    = require('../BaseAction')
const UsersModel    = require('../../models/UsersModel')
const bcrypt        = require('bcrypt')
const nodemailer    = require("nodemailer")
const uuidv1        = require('uuid/v1');


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
            await UsersModel.create(req.body)
            await sendMail();
            return {result: UsersModel.tableName + ' ' + 'successfully created'}
        } catch(err) {
            /**
             * Rotate
             */
            for (var key in UsersModel.errorList) {
                if (err.sqlMessage.includes(key))
                    return {error: UsersModel.errorList[key]}
            }
            return {error: err}
        }
    }

    // async..await is not allowed in global scope, must use a wrapper




}

    async function sendMail(){
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'edd.russel@ethereal.email',
                pass: 'z1S2RvKZwfvcMjAD2v'
            }
        });
        console.log('created transport')
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'edd.russel@ethereal.email', // sender address
            to: "someemail@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
        });

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }


module.exports = CreateAction


