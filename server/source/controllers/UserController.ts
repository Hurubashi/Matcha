import { Request, Response, NextFunction } from 'express'
import { User, UserModel } from '../models/User'
import ResTemplate from './ResTemplate'
import { Interest } from '../models/Interest'

const userModel = new UserModel()

export default class UserController {
	/**
	 * @desc        Get user
	 * @route       GET /api/user
	 * @access      Public
	 */

	public static async getUsers(req: Request, res: Response, next: NextFunction) {
		let userModel = new UserModel()
		let user: User[] = await userModel.getAll()
		return res.sendStatus(200).json(ResTemplate.success(user))
	}

	/**
	 * @desc        Get user
	 * @route       GET /api/user/:id
	 * @access      Public
	 */

	public static async getUser(req: Request, res: Response, next: NextFunction) {
		let userModel = new UserModel()
		let user: User | Error = await userModel.getOne(Number(req.params.id))
		if (userModel.isInstance(user)) {
			return res.sendStatus(200).json(ResTemplate.success(user))
		} else {
			return res.sendStatus(404).json(ResTemplate.error(user.message))
		}
	}

	/**
	 * @desc        Create user
	 * @route       POST /api/user/
	 * @access      Public
	 */

	public static async createUser(req: Request, res: Response, next: NextFunction) {
		return res.json('Create user not works yet')
	}

	/**
	 * @desc        Update user
	 * @route       PUT /api/user/:id
	 * @access      Private/Admin
	 */

	public static async updateUser(req: Request, res: Response, next: NextFunction) {
		userModel.updateWhere({ id: req.params.id }, req.body)
		return res.json('Update user not works yet')
	}

	/**
	 * @desc        Delete user
	 * @route       DELETE /api/user/:id
	 * @access      Private/Admin
	 */

	public static async deleteUser(req: Request, res: Response, next: NextFunction) {
		return res.json('Delete user not works yet')
	}

	/**
	 * @desc        Get user interests
	 * @route       GET /api/user/:id/interests
	 * @access      Public
	 */

	public static async getInterests(req: Request, res: Response, next: NextFunction) {
		let userModel = new UserModel()
		let interests: Interest[] = await userModel.getInterest(Number(req.params.id))
		console.log('interests: ' + interests)
		return res.sendStatus(200).json(ResTemplate.success(interests))
	}

	/**
	 * @desc        Set user interests
	 * @route       POST /api/user/interests/:id
	 * @access      Public
	 */

	public static async setUserInterests(req: Request, res: Response, next: NextFunction) {
		let userModel = new UserModel()
		let interests: Interest[] = await userModel.getInterest(Number(req.params.id))

		return res.sendStatus(200).json(ResTemplate.success(interests))
	}
}
