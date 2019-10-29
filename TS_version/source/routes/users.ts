import express from 'express'
import UserController from '../controllers/users'

const router = express.Router()

router.get('/users', UserController.getUsers)

router.get('/users/:id', UserController.getUser)


export default router

