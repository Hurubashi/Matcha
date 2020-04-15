import express from 'express'
import ImageThumbsUpController from '../controllers/ImageThumbsUpController'
import protect from '../middleware/auth'

const router = express.Router()

router.get('/:imageId', protect, ImageThumbsUpController.getThumbsUp)
router.post('/:imageId', protect, ImageThumbsUpController.postThumbUp)
router.delete('/:imageId', protect, ImageThumbsUpController.deleteThumbUp)

export default router
