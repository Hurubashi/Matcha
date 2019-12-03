import Model from "./Model"

export interface UserSession {
	user_id: number,
	uuid:    string
}

export class UserSessionModel extends Model<UserSession> {

	tableName: string = 'user_session'
	indexRow: string = 'user_id'
	customSqlErrors: Object = {}

}
