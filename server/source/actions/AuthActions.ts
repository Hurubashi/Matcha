import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default class AuthActions {
	createUser() {}

	static getUserId(req: Request) {
		let token = req.cookies['jwt']
		console.log(token)
		var decoded = jwt.decode(token)
		console.log(decoded)
	}
}
