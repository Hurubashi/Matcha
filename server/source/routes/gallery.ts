import express from 'express'
import GalleryController from '../controllers/GalleryController'
import multer from 'multer'
import protect from '../middleware/auth'

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads/')
	},
	filename: function(req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, uniqueSuffix + file.originalname)
	},
})

const upload = multer({ storage: storage })
const router = express.Router()

router.post('/:id', upload.single('image'), GalleryController.postImage)

export default router
