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
	 * @route       GET /api/gallery/:id
	 * @access      Public
	 */

	public static async getImages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromRequest(req)
		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			const images = await imageModel.getWhere({ userId: user.id })
			images.forEach((element, idx) => {
				images[idx].image = `http://localhost:5000/public/uploads/${user.id}/${element.image}`
				delete images[idx].userId
			})
			return res.status(200).json(ResManager.success(images, 'Images successfuly fetched'))
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Post user image
	 * @route       POST /api/gallery/:id
	 * @access      Public
	 */

	public static async postImage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				return res.sendStatus(500)
			} else if (err) {
				return res.status(415).json(ResManager.error(err.message))
			}
		})
		const [user, err] = await UserActions.getUserFromRequest(req)

		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			await imageModel.create({ userId: user.id, image: req.file.filename })
			return res.status(200).json(ResManager.success({}, 'Image successfuly saved'))
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Get user image
	 * @route       GET /api/gallery/image/:id
	 * @access      Public
	 */

	public static async getImage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		return res.status(200).json(ResManager.success({}, 'Images successfuly fetched'))
	}
}
