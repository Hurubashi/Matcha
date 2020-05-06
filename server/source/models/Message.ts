import Model from './Model'

export interface Message {
	id: number
	chatId: number
	senderId: number
	message: string
	time: Date
}

class MessageModel extends Model<Message> {
	tableName: string = 'message'
	indexRow: string = 'id'
	customSqlErrors: Object = {}
	accessibleColumns = []
}

export const messageModel = new MessageModel()
