import { Request, Response, NextFunction } from 'express'
import { Chat, chatModel } from '../models/Chat'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import upload from '../middleware/upload'
import multer from 'multer'
import fs from 'fs'

export default class ImageController {
	/**
	 * @desc        Get user chats
	 * @route       GET /api/chat
	 * @access      public
	 */

	public static async getChats(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)
		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			let chats: Chat[]
			chats = await chatModel.getMyChats(user.id)
			return res.status(200).json(ResManager.success(chats, 'Images successfuly fetched'))
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Post user image
	 * @route       POST /api/image/
	 * @access      public
	 */

	public static async postImage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				return res.sendStatus(500)
			} else if (err) {
				return res.status(415).json(ResManager.error(err.message))
			}
		})
		const [user, err] = await UserActions.getUserFromCookeis(req)

		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			await imageModel.create({ userId: user.id, image: req.file.filename })
			return res.status(201).json(ResManager.success({}, 'Image successfuly saved'))
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Delete user image
	 * @route       DELETE /api/image/:id
	 * @access      public
	 */

	public static async deleteImage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)

		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			await imageModel.delete({ id: req.params.id })
			return res.status(200).json(ResManager.success({}, 'Image successfuly saved'))
		}
		return res.sendStatus(500)
	}
}
