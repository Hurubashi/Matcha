type ResBody = {
	success: boolean
	data?: Object
	msg?: string
}

export class ResInfo {
	code: number
	resBody: ResBody

	constructor(code: number, resBody: ResBody) {
		this.code = code
		this.resBody = resBody
	}
}

export default class ResManager {
	static success(data: Object, message?: string | undefined): ResBody {
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

	static error(message?: string | undefined): ResBody {
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

	static resWithCode(code: number, res: ResBody) {}

	static serverError(): ResInfo {
		return new ResInfo(500, ResManager.error('Something went wrong'))
	}
}
