import express from 'express'
const router = express.Router()
import UserController from './user.controller'

router.get('/', UserController.getAll)
router.post('/set-active', UserController.setActive)
router.post('/send-otp', UserController.sendOTP)
router.get('/:id', UserController.getById)
router.get('/:id', UserController.getById)
router.post('/', UserController.create)
router.patch('/:id', UserController.update)
router.delete('/:id', UserController.delete)

export default router