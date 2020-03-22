import { Request, Response, NextFunction } from 'express'
import { User, UserModel } from '../models/User'
import ResManager from '../util/ResManager'
import { Interest, InterestModel } from '../models/Interest'
import UserActions from '../actions/UserActions'
import { ResInfo } from '../util/ResManager'

interface Params {
	name: string
}
const userModel = new UserModel()

export default class UserController {
	/**
	 * @desc        Get user
	 * @route       GET /api/user
	 * @access      Public
	 */

	public static async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let userModel = new UserModel()
		let user: User[] = await userModel.getAll()
		return res.status(200).json(ResManager.success(user))
	}

	/**
	 * @desc        Get user
	 * @route       GET /api/user/:id
	 * @access      Public
	 */

	public static async getUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let user
		if (req.params.id === 'me') {
			user = await UserActions.getMeFromCookeis(req)
		} else {
			let userModel = new UserModel()
			user = await userModel.getOne(Number(req.params.id))
		}

		if (userModel.isInstance(user)) {
			return res.status(200).json(ResManager.success(user))
		} else {
			return res.sendStatus(500)
		}
	}

	/**
	 * @desc        Get user
	 * @route       GET /api/user/me
	 * @access      Public
	 */

	public static async getMe(req: Request, res: Response, next: NextFunction): Promise<Response> {
		console.log('getme ALLALALALLALAL')

		const user = await UserActions.getMeFromCookeis(req)

		if (userModel.isInstance(user)) {
			return res.status(200).json(ResManager.success(user))
		} else {
			return res.sendStatus(500)
		}
	}

	/**
	 * @desc        Update user
	 * @route       PUT /api/user/:id
	 * @access      Private/Admin
	 */

	public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let userModel = new UserModel()
		let user: User | Error = await userModel.getOne(Number(req.params.id))
		userModel.updateWhere({ id: req.params.id }, req.params)
		if (userModel.isInstance(user)) {
			return res.status(200).json(ResManager.success(user))
		} else {
			return res.status(404).json(ResManager.error(user.message))
		}
	}

	/**
	 * @desc        Delete user
	 * @route       DELETE /api/user/:id
	 * @access      Private/Admin
	 */

	public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		return res.json('Delete user not works yet')
	}

	/**
	 * @desc        Get user interests
	 * @route       GET /api/user/:id/interests
	 * @access      Public
	 */

	public static async getInterests(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const interests = UserActions.getInterests(Number(req.params.id))
		return res.status(200).json(ResManager.success(interests))
	}

	/**
	 * @desc        Set user interests
	 * @route       POST /api/user/:id/interests
	 * @access      Public
	 */

	public static async setUserInterests(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const result = UserActions.setInterests(Number(req.params.id), req.body.interests)
		if (result instanceof ResInfo) {
			return res.status(result.code).json(result.resBody)
		}
		return res.status(200).json()
	}
}
