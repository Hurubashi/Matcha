import {Response} from "express"

export default class Controller {

	protected static success(data: Object): Object {
		return {
			success:    true,
			data:       data,
		}
	}

	protected static error(message: String): Object {
		return {
			success:    false,
			errorMsg:   message,
		}
	}
}