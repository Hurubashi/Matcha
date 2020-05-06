import Model from './Model'
import knex from 'knex'
import { knexConfig } from '../config'
const db = knex(knexConfig)

export interface Chat {
	id: number
	firstUser: number
	secondUser: number
	isOpenFirst: boolean
	isOpenSecond: boolean
}

class ChatModel extends Model<Chat> {
	tableName: string = 'chat'
	indexRow: string = 'id'
	customSqlErrors: Object = {}
	accessibleColumns = []

	async getMyChats(myId: number): Promise<Chat[]> {
		return db
			.select('*')
			.where({ firstUser: myId, isOpenFirst: true })
			.orWhere({ secondUser: myId, isOpenSecond: true })
			.from(this.tableName)
	}
}

export const chatModel = new ChatModel()
