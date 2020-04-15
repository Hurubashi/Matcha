import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/User'
import { Interest, InterestModel } from '../models/Interest'
import ResManager, { ResInfo } from '../util/ResManager'

const userModel = new UserModel()
const interestModel = new InterestModel()

export default class UserActions {
	static async getInterests(userId: number): Promise<string[]> {
		const interests = await userModel.getInterests(userId)
		let names: string[] = []
		interests.forEach((element) => {
			names.push(element.name)
		})
		return names
	}

	static async setInterests(userId: number, interestsList: [string]): Promise<void | ResInfo> {
		let userModel = new UserModel()
		try {
			await interestModel.delete({ userId: userId })
			await userModel.setInterests(userId, interestsList)
		} catch (err) {
			return ResManager.serverError()
		}
	}

	static async getUserFromCookeis(req: Request): Promise<[User, null] | [null, ResInfo]> {
		const token = req.cookies['jwt']
		const decoded = jwt.decode(token)
		let user

		if (decoded && typeof decoded !== 'string') {
			try {
				user = await userModel.getOne(Number(decoded.id))
				if (!user || user instanceof Error) {
					return [null, new ResInfo(422, ResManager.error('No such user'))]
				}
			} finally {
				if (userModel.isInstance(user)) {
					return [user, null]
				} else {
					return [null, ResManager.serverError()]
				}
			}
		}
		return [null, ResManager.serverError()]
	}

	static async getUserById(id: number): Promise<[User, null] | [null, ResInfo]> {
		let user
		try {
			user = await userModel.getOne(id)
		} finally {
			if (user && userModel.isInstance(user)) {
				return [user, null]
			} else {
				return [null, ResManager.serverError()]
			}
		}
	}

	static async getUserFromRequest(req: Request): Promise<[User, null] | [null, ResInfo]> {
		let user: [User, null] | [null, ResInfo]
		if (req.params.id === 'me') {
			user = await UserActions.getUserFromCookeis(req)
		} else {
			user = await UserActions.getUserById(Number(req.params.id))
		}
		return user
	}
}
