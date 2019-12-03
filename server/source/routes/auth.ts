import express from 'express'
import AuthController from '../controllers/AuthController'
import protect from '../middleware/auth'

// Routes to create
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

const router = express.Router()

router.post('/register', protect, AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/me', AuthController.getMe)
router.get('/verify/:id/:uuid', AuthController.verify)


export default router