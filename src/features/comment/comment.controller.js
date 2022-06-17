import { OK } from '@/constants/http-code.constant'
import { getSingleResponse, getPluralResponse } from '@/constants/response.constant'
import CommentService from './comment.service'

class CommentController {
  async getAll(req, res, next) {
    try {
      const data = await CommentService.getAll(req.query)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    const id = req.params.id
    try {
      const data = await CommentService.getById(id)
      return res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await CommentService.create(req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const id = req.params.id
    try {
      const data = await CommentService.update(id, req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const id = req.params.id
    try {
      const data = await CommentService.findByIdAndDelete(id)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }
}

export default new CommentController()
