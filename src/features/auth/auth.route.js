import express from 'express'
const router = express.Router()
import AuthController from './auth.controller'

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/verify-otp', AuthController.verifyOTP)
router.post('/change-password', AuthController.changePassword)
router.post('/log-out', AuthController.logOut)
router.post('/forgotten-password', AuthController.forgottenPassword)

router.post('/login-google', AuthController.loginWithGoogle)
router.post('/login-facebook', AuthController.loginWithFacebook)

export default router