import Model from './Model'

export interface Interest {
	userId: number
	name: string
}

export class InterestModel extends Model<Interest> {
	tableName: string = 'interest'
	indexRow: string = 'userId'
	customSqlErrors: Object = {}
	accessibleColumns = []
}
