import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/User'
import { Interest, InterestModel } from '../models/Interest'
import ResManager, { ResInfo } from '../util/ResManager'

const userModel = new UserModel()
const interestModel = new InterestModel()

export default class UserActions {
	static async getInterests(userId: number): Promise<Interest[]> {
		return await userModel.getInterests(userId)
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

	static async getMeFromCookeis(req: Request): Promise<User | null> {
		const token = req.cookies['jwt']
		const decoded = jwt.decode(token)

		if (decoded && typeof decoded !== 'string') {
			const user = await userModel.getOne(Number(decoded.id))
			if (userModel.isInstance(user)) {
				return user
			} else {
				return null
			}
		}
		return null
	}

	static async getUserFromRequest(req: Request): Promise<User | null> {
		let user
		if (req.params.id === 'me') {
			user = await UserActions.getMeFromCookeis(req)
		} else {
			let userModel = new UserModel()
			try {
				user = await userModel.getOne(Number(req.params.id))
			} catch (err) {
				console.log(err)
			}
		}
		if (userModel.isInstance(user)) {
			return user
		} else {
			return null
		}
	}
}
