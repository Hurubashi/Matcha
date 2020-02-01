import Model from './Model'

export interface UserSession {
	userId: number
	uuid: string
	// datetime: Date
}

export class UserSessionModel extends Model<UserSession> {
	tableName: string = 'userSession'
	indexRow: string = 'userId'
	customSqlErrors: Object = {}
}
