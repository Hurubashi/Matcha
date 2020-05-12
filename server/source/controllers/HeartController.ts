import { Request, Response, NextFunction } from 'express'
import { User, userModel } from '../models/User'
import { Image, imageModel } from '../models/Image'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import { ResInfo } from '../util/ResManager'
import { Heart, heartModel } from '../models/Heart'

import knex from 'knex'
import { knexConfig } from '../config'
let db = knex(knexConfig)

export default class HeartController {
	/**
	 * @desc        Return { hearIsGiven: true } if hurt was sended or { hearIsGiven: false } if not
	 * @route       GET /heart/:userId
	 * @access      private
	 */

	public static async getHeart(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, resInfo] = await UserActions.getUserFromCookeis(req)
		if (user) {
			const heartIsGiven = await heartModel.getWhere({ from: user.id, to: req.params.userId })
			if (heartIsGiven.length > 0) {
				return res.status(200).json(ResManager.success({ hearIsGiven: true }))
			} else {
				return res.status(200).json(ResManager.success({ hearIsGiven: false }))
			}
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Post heart to the user
	 * @route       POST /heart/:userId
	 * @access      private
	 */

	public static async postHeart(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, resInfo] = await UserActions.getUserFromCookeis(req)
		if (user) {
			const heartIsGiven = await heartModel.getWhere({ from: user.id, to: req.params.userId })
			if (heartIsGiven.length > 0) {
				return res.status(409).json(ResManager.error('Heart is already given'))
			}
			const heart = await heartModel.create({ from: user.id, to: req.params.userId })
			if (!(heart instanceof Error)) {
				return res.status(200).json(ResManager.success(heart))
			}
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Delete heart given to the user
	 * @route       DELETE /heart/:userId
	 * @access      private
	 */

	public static async deleteHeart(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, resInfo] = await UserActions.getUserFromCookeis(req)
		if (user) {
			heartModel.delete({ from: user.id, to: req.params.userId })
			return res.status(200).json(ResManager.success({}))
		}
		return res.sendStatus(500)
	}
}
