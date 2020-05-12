import express from 'express'
import HeartController from '../controllers/HeartController'
import protect from '../middleware/auth'

const router = express.Router()

router.get('/:userId', protect, HeartController.getHeart)
router.post('/:userId', protect, HeartController.postHeart)
router.delete('/:userId', protect, HeartController.deleteHeart)

export default router
