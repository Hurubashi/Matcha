import Model from './Model'

export interface UserActivationUUID {
	userId: number
	uuid: string
}

export class UserActivationUUIDModel extends Model<UserActivationUUID> {
	tableName: string = 'userActivationUuid'
	indexRow: string = 'userId'
	customSqlErrors: Object = {}
	accessibleColumns = []
}
