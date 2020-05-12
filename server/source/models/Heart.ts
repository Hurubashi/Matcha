import Model from './Model'

export interface Heart {
	id: number
	from: number
	to: number
}

class HeartModel extends Model<Heart> {
	tableName: string = 'heart'
	indexRow: string = 'id'
	customSqlErrors: Object = {}
	accessibleColumns = []
}

export const heartModel = new HeartModel()
