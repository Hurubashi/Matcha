import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/User'
import { UserSession, UserSessionModel } from '../models/UserSession'
import uuidv1 from 'uuid/v1'
import ResTemplate, { ResInfo } from '../controllers/ResTemplate'

const userModel = new UserModel()
const userSessionModel = new UserSessionModel()

export default class AuthActions {
	createUser() {}

	static getUserId(req: Request): void {
		let token = req.cookies['jwt']
		console.log(token)
		var decoded = jwt.decode(token)
		console.log(decoded)
	}

	static clearSessionCookies(res: Response): void {
		res.clearCookie('user')
		res.clearCookie('jwt')
	}

	static setSessionCookies(res: Response, userId: Number, session: UserSession) {
		const options = {
			expires: session.expire,
			httpOnly: true,
			sameSite: true,
		}
		const token = jwt.sign({ id: userId }, session.uuid, {
			expiresIn: Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60,
		})
		res.cookie('user', true, { expires: session.expire, sameSite: true })
		res.cookie('jwt', token, options)
	}

	static async validateUserLoginData(
		username: string,
		password: string,
		res: Response,
		next: NextFunction,
	) {
		const user = await userModel.getOneWith('username', username)

		if (!user || user instanceof Error) {
			return next(res.status(422).json(ResTemplate.error('No such user').data))

			// return new ResInfo(422, ResTemplate.error('No such user'))
		} else if (user.password != password) {
			return next(res.status(422).json(ResTemplate.error('No such user').data))

			// return new ResInfo(422, ResTemplate.error('Incorrect username or password'))
		} else if (!user.isVerified) {
			return next(res.status(422).json(ResTemplate.error('No such user').data))

			// return new ResInfo(
			// 	403,
			// 	ResTemplate.error('User is not verified. Check your email for verification link.'),
			// )
		}

		return user
	}

	static async removeCurrentSession(userId: number) {
		await userSessionModel.delete({ userId: userId })
	}

	static async createNewSession(userId: number): Promise<UserSession | Error> {
		try {
			const uuid = uuidv1()
			const expire = new Date(
				Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
			)
			await userSessionModel.create({ userId: userId, uuid: uuid, expire: expire })
			const session = await userSessionModel.getOneWith('userId', `${userId}`)
			return session
		} catch (err) {
			return err
		}
	}
}
