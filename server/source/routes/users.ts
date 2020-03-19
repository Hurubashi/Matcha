import express from 'express'
import UserController from '../controllers/UserController'
import protect from '../middleware/auth'

const router = express.Router()

router.get('/', protect, UserController.getUsers)
router.get('/:id', protect, UserController.getUser)
router.post('/', protect, UserController.createUser)

router.get('/:id/interests/', protect, UserController.getInterests)
// router.put('/:id', protect, UserController.updateUser)
// router.delete('/:id', protect, UserController.deleteUser)

export default router
