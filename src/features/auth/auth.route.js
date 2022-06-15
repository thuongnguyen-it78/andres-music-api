import express from 'express'
const router = express.Router()
import AuthController from './auth.controller'

router.post('/register', AuthController.register)
router.post('/verify-otp', AuthController.verifyOTP)
router.post('/login', AuthController.login)
router.post('/login-google', AuthController.loginWithGoogle)
router.post('/login-facebook', AuthController.loginWithFacebook)
router.post('/change-password', AuthController.changePassword)
router.post('/log-out', AuthController.logOut)
router.post('/forgotten-password', AuthController.forgottenPassword)

export default router