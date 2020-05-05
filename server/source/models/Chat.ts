import Model from './Model'

export interface Chat {
	id: number
	firstUser: number
	secondUser: string
	isOpenFist: boolean
	isOpenSecond: boolean
}

export class MessageModel extends Model<Chat> {
	tableName: string = 'chat'
	indexRow: string = 'id'
	customSqlErrors: Object = {}
	accessibleColumns = []
}
