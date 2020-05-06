import { Request, Response, NextFunction } from 'express'
import { Chat, chatModel } from '../models/Chat'
import { Message, messageModel } from '../models/Message'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'

export default class MessageController {
	/**
	 * @desc        Get user chats
	 * @route       GET /message/chat/:id
	 * @access      private
	 */

	public static async getMessages(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)
		const chat = await chatModel.getOne(req.params.id)
		if (!(chat instanceof Error)) {
			if (chat.firstUser === user?.id || chat.secondUser === user?.id) {
				const messages = await messageModel.getWhere({ chatId: chat.id })
				return res.status(200).json(ResManager.success(messages))
			} else {
				return res.sendStatus(401)
			}
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        POST chat message
	 * @route       POST /message
	 * @access      private
	 */

	public static async postChatMessage(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)
		const chat = await chatModel.getOne(req.body.chatId)
		if (!(chat instanceof Error)) {
			if (chat.firstUser === user?.id || chat.secondUser === user?.id) {
				const message = await messageModel.create({ chatId: chat.id, senderId: user.id, message: req.body.message })
				if (message! instanceof Error) return res.status(200).json(ResManager.success(message))
			} else {
				return res.sendStatus(401)
			}
		}
		return res.sendStatus(500)
	}
}
