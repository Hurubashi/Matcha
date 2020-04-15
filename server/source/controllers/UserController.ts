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
		const user = await UserActions.getUserFromRequest(req)

		if (user instanceof ResInfo) {
			return res.status(user.code).json(user.resBody)
		}

		const userAccessibleData = userModel.fillAccessibleColumns({ ...user })
		const interests = await UserActions.getInterests(Number(user.id))
		userAccessibleData['interests'] = interests
		return res.status(200).json(ResManager.success(userAccessibleData))
	}

	/**
	 * @desc        Update me
	 * @route       PUT /api/user/me
	 * @access      Private
	 */

	public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)
		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			let userAccessibleData = userModel.fillAccessibleColumns({ ...req.body })

			try {
				await userModel.updateWhere({ id: user.id }, userAccessibleData)
				await UserActions.setInterests(Number(user.id), req.body.interests)
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

	/** @todo move interests regueest and routes */

	/**
	 * @desc        Get user interests
	 * @route       GET /api/user/:id/interests
	 * @access      Public
	 */

	public static async getInterests(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const interests = await UserActions.getInterests(Number(req.params.id))
		return res.status(200).json(ResManager.success(interests))
	}

	/**
	 * @desc        Set user interests
	 * @route       POST /api/user/:id/interests
	 * @access      Public
	 */

	public static async setUserInterests(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const result = await UserActions.setInterests(Number(req.params.id), req.body.interests)
		if (result instanceof ResInfo) {
			return res.status(result.code).json(result.resBody)
		}
		return res.status(200).json()
	}
}
