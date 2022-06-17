import express from 'express'
const router = express.Router()
import CommentController from './comment.controller'

router.get('/', CommentController.getAll)
router.get('/:id', CommentController.getById)
router.post('/', CommentController.create)
router.patch('/:id', CommentController.update)
router.delete('/:id', CommentController.delete)

export default router