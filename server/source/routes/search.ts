import express from 'express'
import ImageController from '../controllers/SearchController'
import protect from '../middleware/auth'
import upload from '../middleware/upload'

const router = express.Router()

router.get('/:lookingfor/:interest/:range', protect, ImageController.searchUsers)

export default router
