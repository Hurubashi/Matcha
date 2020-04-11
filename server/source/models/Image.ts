import Model from './Model'

export interface Image {
	userId: number
	image: string
}

class ImageModel extends Model<Image> {
	tableName: string = 'image'
	indexRow: string = 'userId'
	customSqlErrors: Object = {}
	accessibleColumns = []
}

export const imageModel = new ImageModel()
