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
		interests.forEach(element => {
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

	static async getMeFromCookeis(req: Request): Promise<User | ResInfo> {
		const token = req.cookies['jwt']
		const decoded = jwt.decode(token)

		if (decoded && typeof decoded !== 'string') {
			try {
				const user = await userModel.getOne(Number(decoded.id))
				if (!user || user instanceof Error) {
					return new ResInfo(422, ResManager.error('No such user'))
				}
				return user
			} catch (e) {
				return ResManager.serverError()
			}
		}
		return ResManager.serverError()
	}

	static async getUserFromRequest(req: Request): Promise<User | ResInfo> {
		let user
		if (req.params.id === 'me') {
			user = await UserActions.getMeFromCookeis(req)
		} else {
			try {
				user = await userModel.getOne(Number(req.params.id))
			} catch (err) {
				return ResManager.serverError()
			}
		}
		if (userModel.isInstance(user)) {
			return user
		} else {
			return ResManager.serverError()
		}
	}
}
