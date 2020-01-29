import Model from './Model'

export interface UserSession {
	user_id: number
	uuid: string
}

export class UserSessionModel extends Model<UserSession> {
	tableName: string = 'userSession'
	indexRow: string = 'userId'
	customSqlErrors: Object = {}
}
