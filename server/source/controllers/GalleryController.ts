import { Request, Response, NextFunction } from 'express'
import { User, UserModel } from '../models/User'
import { Image, imageModel } from '../models/Image'

import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import fs from 'fs'
import { ResInfo } from '../util/ResManager'
import upload from '../middleware/upload'
import multer from 'multer'

const userModel = new UserModel()

export default class UserController {
	/**
	 * @desc        Get user images
	 * @route       GET /api/gallery/:userId
	 * @access      Public
	 */

	public static async getImages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const user = await UserActions.getUserFromRequest(req)
		console
		if (!(user instanceof ResInfo)) {
			const images = await imageModel.getWhere({ userId: user.id })
			console.log(images)
			let names: string[] = []
			images.forEach((element) => {
				names.push(user.id + '/' + element.image)
			})
			console.log(images)
			console.log(names)
			return res.status(200).json(ResManager.success(names, 'Images successfuly fetched'))
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Post user image
	 * @route       POST /api/gallery/:id
	 * @access      Public
	 */

	public static async postImage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		console.log('post image')
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				return res.sendStatus(500)
			} else if (err) {
				return res.status(415).json(ResManager.error(err.message))
			}
		})
		const user = await UserActions.getUserFromRequest(req)

		console.log(user)
		if (!(user instanceof ResInfo)) {
			console.log(req.file)
			const result = await imageModel.create({ userId: user.id, image: req.file.filename })
			if (result instanceof Error) {
				console.log(result.message)
			} else {
				console.log(result)
			}
			return res.status(200).json(ResManager.success({}, 'Image successfuly saved'))
		}
		return res.status(user.code).json(user.resBody)
	}

	/**
	 * @desc        Get user image
	 * @route       GET /api/gallery/image/:id
	 * @access      Public
	 */

	public static async getImage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		let user = await UserActions.getUserById(Number(req.params.userId))

		return res.status(200).json(ResManager.success({}, 'Images successfuly fetched'))
	}
}
