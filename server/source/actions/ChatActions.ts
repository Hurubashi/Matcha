import { Chat, chatModel } from '../models/Chat'
import { Message, messageModel } from '../models/Message'
import ResManager, { ResInfo } from '../util/ResManager'

import knex from 'knex'
import { knexConfig } from '../config'
let db = knex(knexConfig)

export default class ChatActions {
	static async postMessage(chatId: number, senderId: number, text: string): Promise<[Message, null] | [null, ResInfo]> {
		const chat = await chatModel.getOne(chatId)
		if (!(chat instanceof Error)) {
			if (chat.firstUser === senderId || chat.secondUser === senderId) {
				const message = await messageModel.create({ chatId: chat.id, senderId: senderId, message: text })
				if (!(message instanceof Error)) return [message, null]
			} else {
				return [null, new ResInfo(401, ResManager.error())]
			}
		}
		return [null, ResManager.serverError()]
	}
}
