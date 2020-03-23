import { Request, Response, NextFunction } from 'express'
import { User, UserModel } from '../models/User'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import { ResInfo } from '../util/ResManager'

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
		const user = UserActions.getUserFromRequest(req)

		if (user) {
			return res.status(200).json(ResManager.success(user))
		} else {
			return res.status(404)
		}
	}

	/**
	 * @desc        Get me
	 * @route       GET /api/user/me
	 * @access      Public
	 */

	public static async getMe(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const user = await UserActions.getMeFromCookeis(req)

		if (userModel.isInstance(user)) {
			return res.status(200).json(ResManager.success(user))
		} else {
			return res.sendStatus(500)
		}
	}

	/**
	 * @desc        Update me
	 * @route       PUT /api/user/me
	 * @access      Private
	 */

	public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const user = await UserActions.getMeFromCookeis(req)
		let update = userModel.fillAccessibleColumns({ ...req.body })
		if (user) {
			try {
				await userModel.updateWhere({ id: user.id }, update)
				return res.sendStatus(200)
			} catch (e) {
				return res.status(406).json(ResManager.error(e.message))
			}
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Delete me
	 * @route       DELETE /api/user/me
	 * @access      Private
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
