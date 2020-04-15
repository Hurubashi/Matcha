import express from 'express'
import ImageThumbsUpController from '../controllers/ImageThumbsUpController'
import protect from '../middleware/auth'

const router = express.Router()

router.get('/:id', protect, ImageThumbsUpController.getThumbsUp)
router.post('/:id', protect, ImageThumbsUpController.postThumbUp)
router.delete('/:id', protect, ImageThumbsUpController.deleteThumbUp)

export default router
