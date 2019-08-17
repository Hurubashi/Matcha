const BaseAction    = require('../BaseAction')
const UsersModel    = require('../../models/UsersModel')
const uuidOperation = require('../../models/UUIDToOperationModel')

/**
 * @description Confirms Email address
 */
class EmailConfirmationAction extends BaseAction {

	static async run(req) {
		
		// const match = await bcrypt.compare(req.body.password, user[0].password)
		
		const uuid = await uuidOperation.getWhere(
			{user_id: req.params.id})
			// .then((res) => {return res[0].uuid})

		console.log(req.params.id)
		console.log(uuid)
		if (uuid == req.params.uuid) {
			return {result: 'Success'}
		} else {
			return {error: 'UUID key is wrong.'}
		}

	}

}

module.exports = EmailConfirmationAction


