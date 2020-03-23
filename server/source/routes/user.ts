import express from 'express'
import UserController from '../controllers/UserController'
import protect from '../middleware/auth'

const router = express.Router()

router.get('/', protect, UserController.getUsers)
router.get('/:id', protect, UserController.getUser)
router.put('/me', protect, UserController.updateUser)
router.delete('/me', protect, UserController.deleteUser)

router.get('/:id/interests/', protect, UserController.getInterests)
router.post('/:id/interests/', protect, UserController.setUserInterests)
// router.delete('/:id', protect, UserController.deleteUser)

export default router
