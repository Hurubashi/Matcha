import Model from './Model'

export interface LookingFor {
	userId: number
	name: string
}

export class LookingForModel extends Model<LookingFor> {
	tableName: string = 'lookingFor'
	indexRow: string = 'userId'
	customSqlErrors: Object = {}
	accessibleColumns = []
}
