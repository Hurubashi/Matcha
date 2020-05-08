import { Request, Response, NextFunction } from 'express'
import imagemin, { buffer } from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminPngquant from 'imagemin-pngquant'
import imageminMozjpeg from 'imagemin-mozjpeg'
import multer from 'multer'
import fs from 'fs'

import { userModel } from '../models/User'
import { Image, imageModel } from '../models/Image'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import upload from '../middleware/upload'

interface ResponceImage {
	id: number
	image: {
		normal: string
		thumbnail: string
	}
}
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
			const respondImages: ResponceImage[] = []
			images.forEach((elem, idx) => {
				const newResImg = {
					id: elem.id,
					image: {
						normal: `http://localhost:5000/public/uploads/normal/${elem.image}`,
						thumbnail: `http://localhost:5000/public/uploads/thumbnail/${elem.image}`,
					},
				}
				respondImages.push(newResImg)
			})
			return res.status(200).json(ResManager.success(respondImages, 'Images successfuly fetched'))
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
			const files = await imagemin([`public/uploads/normal/${req.file.filename}`], {
				destination: 'public/uploads/thumbnail/',
				plugins: [
					imageminMozjpeg({ quality: 15 }),
					imageminPngquant({
						quality: [0.15, 0.2],
					}),
				],
			})
			console.log(files)
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
			const image = await imageModel.getOne(req.params.id)
			if (!(image instanceof Error)) {
				if (image.id === user.id) {
					await userModel.updateWhere({ id: user.id }, { avatar: null })
				}
				await imageModel.delete({ id: req.params.id })
				fs.unlink(`public/uploads/normal/` + image.image, () => {})
				fs.unlink(`public/uploads/thumbnail/` + image.image, () => {})
				return res.status(200).json(ResManager.success({}, 'Image successfuly removed'))
			}
		}
		return res.sendStatus(500)
	}
}
