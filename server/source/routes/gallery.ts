import express from 'express'
import GalleryController from '../controllers/GalleryController'
import protect from '../middleware/auth'

const router = express.Router()

router.post('/:id', GalleryController.postImage)

export default router
