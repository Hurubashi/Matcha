import { Request, Response, NextFunction } from 'express'
import { User, UserModel } from '../models/User'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import fs from 'fs'
import { ResInfo } from '../util/ResManager'

const userModel = new UserModel()

export default class UserController {
	/**
	 * @desc        Get user images
	 * @route       GET /api/gallery/:userId
	 * @access      Public
	 */

	public static async getImages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let user = await UserActions.getUserById(Number(req.params.userId))

		return res.status(200).json(ResManager.success({}, 'Dummy route'))
	}

	/**
	 * @desc        Post user image
	 * @route       POST /api/gallery/:id
	 * @access      Public
	 */

	public static async postImage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const user = await UserActions.getUserFromRequest(req)
		console.log('postImage')
		console.log(req.file)

		return res.status(200).json(ResManager.success({}, 'Images successfuly fetched'))
	}

	/**
	 * @desc        Get user image
	 * @route       GET /api/gallery/:imageId
	 * @access      Public
	 */

	public static async getImage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let user = await UserActions.getUserById(Number(req.params.userId))

		return res.status(200).json(ResManager.success({}, 'Images successfuly fetched'))
	}
}
