const BaseModel = require('../core/BaseModel')

class UUIDToOperationModel extends BaseModel {

	static get tableName() {
		return 'uuid_to_operation'
	}

	static get emailConfirmation() {
		return 'email confirtaion';
	}

	static get avaliableOperations() {
		return  [
					'email confirmation',
					'password change'
		]
	}

	/**
	 * ------------------------------
	 * @METHODS
	 * ------------------------------
	 */


}

module.exports = UUIDToOperationModel