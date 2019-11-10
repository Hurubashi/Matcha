export default class Controller {
	 protected static responseTemplate(success: Boolean, data: Object, message: String): Object {
		return {
			success:    success,
			message:    message,
			data:       data,
		}
	}
}