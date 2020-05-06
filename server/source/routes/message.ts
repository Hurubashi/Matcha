import express from 'express'
import MessageController from '../controllers/MessageController'
import protect from '../middleware/auth'

const router = express.Router()

router.get('/chat/:id', protect, MessageController.getMessages)
router.post('/chat/:id', protect, MessageController.postChatMessage)

export default router
