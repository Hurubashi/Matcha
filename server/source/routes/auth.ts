import express from 'express'
import AuthController from '../controllers/AuthController'
import protect from '../middleware/auth'

// Routes to create
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

const router = express.Router()
const auth = new AuthController()

router.post('/register', auth.register)
router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.post('/me', protect, auth.getMe)
router.get('/verify/:id/:uuid', auth.verify)

export default router
