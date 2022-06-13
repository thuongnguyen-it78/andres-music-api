import express from 'express'
const router = express.Router()
import AuthController from './auth.controller'

router.get('/', AuthController.getAll)
router.get('/:id', AuthController.getById)
router.post('/', AuthController.create)
router.patch('/:id', AuthController.update)
router.delete('/:id', AuthController.delete)

export default router