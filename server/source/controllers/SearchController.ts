import { Request, Response, NextFunction } from 'express'
import { User, UserModel } from '../models/User'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import { ResInfo } from '../util/ResManager'
import { imageModel } from '../models/Image'

const userModel = new UserModel()

export default class SearchController {
	/**
	 * @desc        Get user
	 * @route       GET /user/:username
	 * @access      Public
	 */

	public static async searchUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)
		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			let results = await UserActions.search(req, user)
			return res.status(200).json(ResManager.success(results))
		}
		return res.sendStatus(500)
	}
}
