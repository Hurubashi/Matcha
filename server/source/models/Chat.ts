import Model from './Model'

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
		return this.db
			.select('*')
			.where({ firstUser: myId, isOpenFirst: true })
			.orWhere({ secondUser: myId, isOpenSecond: true })
			.from(this.tableName)
	}
}

export const chatModel = new ChatModel()
