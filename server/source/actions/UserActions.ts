import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserModel } from '../models/User'
import { InterestModel } from '../models/Interest'
import { LookingForModel } from '../models/LookingFor'
import ResManager, { ResInfo } from '../util/ResManager'
import { imageModel } from '../models/Image'

const userModel = new UserModel()
const interestModel = new InterestModel()
const lookingForModel = new LookingForModel()

export default class UserActions {
	static async getInterests(userId: number): Promise<string[]> {
		const interests = await userModel.getInterests(userId)
		let names: string[] = []
		interests.forEach((element) => {
			names.push(element.name)
		})
		return names
	}

	static async getLookingFor(userId: number): Promise<string[]> {
		const interests = await userModel.getLookingFor(userId)
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

	static async setLookingFor(userId: number, interestsList: [string]): Promise<void | ResInfo> {
		let userModel = new UserModel()
		try {
			await lookingForModel.delete({ userId: userId })
			await userModel.setLookingFor(userId, interestsList)
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

	static async getUserByUsername(usernmae: string): Promise<[User, null] | [null, ResInfo]> {
		let user
		try {
			user = await userModel.getWhere({ username: usernmae })
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
		if (req.params.usernmae) {
			user = await UserActions.getUserByUsername(req.params.username)
		} else {
			user = await UserActions.getUserFromCookeis(req)
		}
		return user
	}

	static async getProfileData(user: User) {
		const userAccessibleData = userModel.fillAccessibleColumns({ ...user })
		const interests = await UserActions.getInterests(Number(user.id))
		const lookingFor = await UserActions.getLookingFor(Number(user.id))
		if (user.avatar) {
			const image = await imageModel.getWhere({ id: user.avatar })
			if (image[0]) {
				userAccessibleData['avatarUrl'] = `http://localhost:5000/public/uploads/${user.id}/${image[0].image}`
			}
		}
		userAccessibleData['interests'] = interests
		userAccessibleData['lookingFor'] = lookingFor
		return userAccessibleData
	}
}
