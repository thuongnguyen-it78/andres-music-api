import express from 'express'
const router = express.Router()
import PostController from './post.controller'

router.get('/', PostController.getAll)
router.get('/:id', PostController.getById)
router.post('/', PostController.create)
router.patch('/:id', PostController.update)
router.delete('/:id', PostController.delete)

export default router