import UserActions from '../actions/UserActions'
import ResManager from '../util/ResManager'
import { UserModel } from '../models/User'
import multer from 'multer'
import fs from 'fs'

const model = new UserModel()
const allowedMimes = ['image/png', 'image/jpeg', 'image/gif']

var storage = multer.diskStorage({
	destination: async function (req, file, cb) {
		const user = await UserActions.getMeFromCookeis(req)

		if (model.isInstance(user)) {
			const dir = `public/uploads/${user.id}`
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir)
			}
			if (allowedMimes.includes(file.mimetype)) {
				cb(null, dir)
			} else {
				cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'), '')
			}
		} else {
			cb(Error('Session error'), '')
		}
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, uniqueSuffix + file.originalname)
	},
})

var limits = {
	files: 1, // allow only 1 file per request
	fileSize: 2048 * 2048, // 2 MB (max file size)
}

const upload = multer({ storage: storage, limits: limits }).single('image')

export default upload
