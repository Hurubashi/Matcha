export default class ResTemplate {
	static success(data: Object, message?: String | undefined): Object {
		const res = message
			? {
					success: true,
					data: data,
					msg: message,
			  }
			: {
					success: true,
					data: data,
			  }

		return res
	}

	static error(message?: String | undefined): Object {
		const res = message
			? {
					success: false,
					msg: message,
			  }
			: {
					success: false,
			  }

		return res
	}
}
