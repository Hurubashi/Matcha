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
	 * @route       GET /api/imagethumths/:imageId
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
	 * @route       POST /api/imagethumths/:imageId
	 * @access      private
	 */

	public static async postThumbUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
		return res.sendStatus(500)
	}

	/**
	 * @desc        Delete thumb up for the picture
	 * @route       DELETE /api/imagethumths/:imageId
	 * @access      private
	 */

	public static async deleteThumbUp(req: Request, res: Response, next: NextFunction): Promise<Response> {
		return res.sendStatus(500)
	}
}
