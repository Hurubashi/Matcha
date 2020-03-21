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
	if (req.cookies['jwt']) {
		token = req.cookies['jwt']
	} else {
		return next(res.status(401).json('Not authorized to access this route'))
	}

	try {
		// Verify token
		let session
		var decoded = jwt.decode(token)

		if (decoded && typeof decoded !== 'string') {
			const userSessionModel = new UserSessionModel()
			session = await userSessionModel.getOneWith('userId', `${decoded.id}`)
		}

		if (session) {
			jwt.verify(token, session.uuid as jwt.Secret)
			if (decoded && typeof decoded !== 'string') {
			}
		}
		next()
	} catch (err) {
		return next(res.status(401).json('Not authorized to access this route'))
	}
}
