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
		console.log(token)
		const decoded = jwt.decode(token)
		console.log(decoded)

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
}
