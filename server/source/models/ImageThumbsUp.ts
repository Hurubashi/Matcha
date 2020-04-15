import Model from './Model'

export interface ImageThumbUp {
	id: number
	userId: number
	imageId: number
}

class ImageThumbUpModel extends Model<ImageThumbUp> {
	tableName: string = 'imageThumbUp'
	indexRow: string = 'imageId'
	customSqlErrors: Object = {}
	accessibleColumns = []
}

export const imageModel = new ImageThumbUpModel()
