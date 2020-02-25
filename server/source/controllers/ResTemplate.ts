export default class ResTemplate {
	static success(data: Object, message: String = ''): Object {
		return {
			success: true,
			data: data,
			msg: message,
		}
	}

	static error(message: String): Object {
		return {
			success: false,
			msg: message,
		}
	}
}
