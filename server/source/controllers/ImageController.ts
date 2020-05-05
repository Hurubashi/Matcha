import { Request, Response, NextFunction } from 'express'
import { Image, imageModel } from '../models/Image'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import upload from '../middleware/upload'
import multer from 'multer'
import fs from 'fs'

export default class ImageController {
	/**
	 * @desc        Get user images
	 * @route       GET /image/:id
	 * @access      public
	 */

	public static async getImages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)
		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			let images: Image[]
			if (req.params.id) {
				images = await imageModel.getWhere({ id: req.params.id })
			} else {
				images = await imageModel.getWhere({ userId: user.id })
			}
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
	 * @route       POST /image/
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
	 * @route       DELETE /image/:id
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
