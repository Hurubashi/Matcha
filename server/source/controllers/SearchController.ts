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
	 * @route       GET /api/user/:username
	 * @access      Public
	 */

	public static async searchUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let results = await UserActions.search(req.params.lookingfor, req.params.interest, Number(req.params.range))
		console.log(req.params.lookingfor)
		console.log(req.params.interest)
		console.log(req.params.range)
		return res.status(200).json(results[0])
	}
}
