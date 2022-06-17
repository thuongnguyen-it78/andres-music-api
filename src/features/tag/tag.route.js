import express from 'express'
const router = express.Router()
import TagController from './tag.controller'

router.get('/', TagController.getAll)
router.get('/:id', TagController.getById)
router.post('/', TagController.create)
router.patch('/:id', TagController.update)
router.delete('/:id', TagController.delete)

export default router