const BaseAction    = require('../BaseAction')
const UsersModel    = require('../../models/UsersModel')
const UUIDToOperationModel = require('../../models/UUIDToOperationModel')

/**
 * @description Confirms Email address
 */
class EmailConfirmationAction extends BaseAction {

	static get validationRules() {
		return {
			body: this.joi.object().keys({
				// username: this.joi.string().alphanum().min(3).max(16).required(),
				// password: this.joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
			})
		}
	}

	static async run(req) {

		// const user = await UsersModel.getByRow('username', req.body.username)

		// const match = await bcrypt.compare(req.body.password, user[0].password)
		console.log(req.query)
		console.log(UUIDToOperationModel.emailConfirmation)

		if (false) {
			return {result: 'Success'}
		} else {
			return {result: 'Failure'}
		}

	}

}

module.exports = EmailConfirmationAction


