import Model from './Model'
import knex from 'knex'
import { knexConfig } from '../config'
const db = knex(knexConfig)

export interface Chat {
	id: number
	firstUser: number
	secondUser: number
	isOpen: boolean
}

export interface ChatResponce {
	id: number
	interlocutorId: number
	interlocutorName: string
	interlocutorAvatar?: string
	lastMsg?:
		| {
				lastMsg: string
				lastMsgTime: Date
		  }
		| undefined
}

class ChatModel extends Model<Chat> {
	tableName: string = 'chat'
	indexRow: string = 'id'
	customSqlErrors: Object = {}
	accessibleColumns = []

	async getMyChats(myId: number): Promise<Chat[]> {
		return db
			.select('*')
			.where({ firstUser: myId, isOpen: true })
			.orWhere({ secondUser: myId, isOpen: true })
			.from(this.tableName)
	}
}

export const chatModel = new ChatModel()
