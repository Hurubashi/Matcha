import { Request, Response, NextFunction } from 'express'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import ChatActions from '../actions/ChatActions'
import { PublicProfile } from '../models/User'

export default class ImageController {
	/**
	 * @desc        Get user chats
	 * @route       GET /chat
	 * @access      public
	 */

	public static async getChats(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)
		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			const chatResp = await ChatActions.getChats(user.id)
			return res.status(200).json(ResManager.success(chatResp))
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Post chat
	 * @route       POST /chat
	 * @access      public
	 */

	public static async postChat(req: Request, res: Response, next: NextFunction): Promise<Response> {
		// const [user, err] = await UserActions.getUserFromCookeis(req)

		// if (err) {
		// 	return res.status(err.code).json(err.resBody)
		// } else if (user) {
		// 	await imageModel.create({ userId: user.id, image: req.file.filename })
		// 	return res.status(201).json(ResManager.success({}, 'Image successfuly saved'))
		// }
		return res.sendStatus(500)
	}
}
