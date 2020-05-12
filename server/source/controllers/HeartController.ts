import { Request, Response, NextFunction } from 'express'
import { Chat, chatModel } from '../models/Chat'
import ResManager from '../util/ResManager'
import { Heart, heartModel } from '../models/Heart'
import UserActions from '../actions/UserActions'
import ChatActions from '../actions/ChatActions'

import knex from 'knex'
import { knexConfig } from '../config'
import { chatServer } from '../util/ChatServer'
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
				await ChatActions.openChatIfNeeded(user.id, Number(req.params.userId))
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
			await heartModel.delete({ from: user.id, to: req.params.userId })

			await chatModel.updateWhere({ firstUser: user.id, secondUser: req.params.userId }, { isOpen: false })
			await chatModel.updateWhere({ firstUser: req.params.userId, secondUser: user.id }, { isOpen: false })
			await chatServer.refreshChatListForUsers(user.id, Number(req.params.userId))

			return res.status(200).json(ResManager.success({}))
		}
		return res.sendStatus(500)
	}
}
