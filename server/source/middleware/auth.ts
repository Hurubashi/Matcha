import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/User'
import { UserSession, UserSessionModel } from '../models/UserSession'

export default async function protect(req: Request, res: Response, next: NextFunction) {
	let token
	console.log('Protect route')
	// if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
	// 	// Set token from Bearer token in header
	// 	token = req.headers.authorization.split(' ')[1]
	// 	// Set token from cookie
	// } else
	if (req.cookies.token) {
		token = req.cookies.token
	}

	// Make sure token exists
	if (!token) {
		return next(res.status(401).json('Not authorized to access this route'))
	}

	try {
		// Verify token
		let token = req.cookies['jwt']
		console.log(token)
		let decoded = jwt.decode(token)
		const userSessionModel = new UserSessionModel()
		const session = await userSessionModel.getOneWith('userId', `${token.id}`)

		if (session) {
			const verified = jwt.verify(token, session.uuid as jwt.Secret)
			console.log('verified: ' + verified)
			console.log(decoded)
		}

		next()
	} catch (err) {
		return next(res.status(401).json('Not authorized to access this route'))
	}
}
