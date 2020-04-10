import express from 'express'
import GalleryController from '../controllers/GalleryController'
import protect from '../middleware/auth'
import handleUpload from '../middleware/upload'

const router = express.Router()

router.post('/me', protect, handleUpload, GalleryController.postImage)

export default router
