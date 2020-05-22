import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, userModel } from '../models/User'
import { UserSession, UserSessionModel } from '../models/UserSession'
import uuidv1 from 'uuid/v1'
import ResManager, { ResInfo } from '../util/ResManager'

const userSessionModel = new UserSessionModel()

export default class AuthActions {
	static clearSessionCookies(res: Response): void {
		res.clearCookie('jwt')
	}

	static setSessionCookies(res: Response, userId: Number, session: UserSession) {
		const options = {
			expires: session.expire,
			// httpOnly: true,
			sameSite: true,
		}
		const token = jwt.sign({ id: userId }, session.uuid, {
			expiresIn: Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60,
		})
		res.cookie('jwt', token, options)
	}

	static async validateUserLoginData(username: string, password: string): Promise<ResInfo | User> {
		try {
			const user = await userModel.getOneWith('username', username)
			if (!user || user instanceof Error) {
				return new ResInfo(422, ResManager.error('No such user'))
			} else if (user.password != password) {
				return new ResInfo(422, ResManager.error('Incorrect username or password'))
			}
			return user
		} catch (err) {
			return ResManager.serverError()
		}
	}

	static async removeCurrentSession(userId: number) {
		await userSessionModel.delete({ userId: userId })
	}

	static async createNewSession(userId: number): Promise<UserSession | ResInfo> {
		let session

		try {
			const uuid = uuidv1()
			const expire = new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000)
			session = await userSessionModel.create({ userId: userId, uuid: uuid, expire: expire })
		} catch (err) {
			return new ResInfo(500, ResManager.error(err.message))
		}

		if (userSessionModel.isInstance(session)) {
			return session
		} else {
			return ResManager.serverError()
		}
	}
}
