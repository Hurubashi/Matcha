import express from 'express'
import ImageController from '../controllers/ImageController'
import protect from '../middleware/auth'
import upload from '../middleware/upload'

const router = express.Router()

router.get('/', protect, ImageController.getImages)
router.post('/', protect, upload, ImageController.postImage)

export default router
