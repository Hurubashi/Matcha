import { Request, Response, NextFunction } from 'express'
import { User, UserModel } from '../models/User'
import { Image, imageModel } from '../models/Image'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import fs from 'fs'
import { ResInfo } from '../util/ResManager'
import { ImageThumbUp } from '../models/ImageThumbsUp'

const userModel = new UserModel()

export default class ImageThumbsUpController {
	/**
	 * @desc        Get thumbs up of the picture
	 * @route       GET /api/imagethumths/:id
	 * @access      private
	 */

	public static async getThumbsUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
		// const [user, resInfo] = await UserActions.getMeFromCookeis(req)

		// if (resInfo) {
		// 	return res.status(resInfo.code).json(resInfo.resBody)
		// } else if(user) {
		//     user
		// }
		return res.sendStatus(500)
	}

	/**
	 * @desc        Post thumbs up for the picture
	 * @route       POST /api/imagethumths/me
	 * @access      private
	 */

	public static async postThumbUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
		// const user = await UserActions.getUserFromRequest(req)
		// return res.status(user.code).json(user.resBody)
	}

	/**
	 * @desc        Delete thumb up for the picture
	 * @route       DELETE /api/gallery/image/:id
	 * @access      private
	 */

	public static async deleteThumbUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
		// let user = await UserActions.getUserById(Number(req.params.userId))
		// return res.status(200).json(ResManager.success({}, 'Images successfuly fetched'))
	}
}
