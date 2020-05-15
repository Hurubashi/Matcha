import { Chat, chatModel, ChatResponce } from '../models/Chat'
import { Heart, heartModel } from '../models/Heart'
import { Message, messageModel } from '../models/Message'
import ResManager, { ResInfo } from '../util/ResManager'
import { chatServer } from '../util/ChatServer'
import UserActions from './UserActions'

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

	static async getChats(userId: number): Promise<ChatResponce[]> {
		const chats: Chat[] = await chatModel.getMyChats(userId)
		let chatResp: ChatResponce[] = []
		for (const chat of chats) {
			const conterpartyId = chat.firstUser === userId ? chat.secondUser : chat.firstUser
			const [interlocutor, err] = await UserActions.getUserById(conterpartyId)
			const lastMsg = await db<Message>('message').where({ chatId: chat.id }).orderBy('time', 'desc').limit(1)
			if (interlocutor) {
				let profile = await UserActions.getProfileData(interlocutor, userId)
				chatResp.push({
					id: chat.id,
					interlocutorId: conterpartyId,
					interlocutorName: profile.firstName + ' ' + profile.lastName,
					interlocutorAvatar: profile.avatar?.thumbnail,
					lastMsg:
						lastMsg.length > 0
							? {
									senderId: lastMsg[0].senderId,
									text: lastMsg[0].message,
									time: lastMsg[0].time,
							  }
							: undefined,
				})
			}
		}
		return chatResp
	}

	static async openChatIfNeeded(userId1: number, userId2: number) {
		const heartIsGiven1 = await heartModel.getWhere({ from: userId1, to: userId2 })
		const heartIsGiven2 = await heartModel.getWhere({ from: userId2, to: userId1 })
		if (heartIsGiven1.length > 0 && heartIsGiven2.length > 0) {
			const chat = await ChatActions.returChatIfExists(userId1, userId2)
			if (chat) {
				await chatModel.updateWhere({ id: chat.id }, { isOpen: true })
			} else {
				await chatModel.create({
					firstUser: userId1,
					secondUser: userId2,
					isOpen: true,
				})
			}
			if (!(chat instanceof Error)) {
				chatServer.refreshChatListForUsers(userId1, userId2)
			}
		}
	}

	static async returChatIfExists(userId1: number, userId2: number): Promise<Chat | null> {
		const res1 = await chatModel.getWhere({ firstUser: userId1, secondUser: userId2 })
		const res2 = await chatModel.getWhere({ firstUser: userId2, secondUser: userId1 })
		if (res1.length > 0) {
			return res1[0]
		} else if (res2.length > 0) {
			return res2[0]
		}
		return null
	}
}
