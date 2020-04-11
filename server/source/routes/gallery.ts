import express from 'express'
import GalleryController from '../controllers/GalleryController'
import protect from '../middleware/auth'
import upload from '../middleware/upload'

const router = express.Router()

router.get('/:id', protect, GalleryController.getImages)
router.post('/:id', protect, upload, GalleryController.postImage)

export default router
