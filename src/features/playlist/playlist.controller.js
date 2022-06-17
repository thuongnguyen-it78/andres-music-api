import { OK } from '@/constants/http-code.constant'
import { getSingleResponse, getPluralResponse } from '@/constants/response.constant'
import PlaylistService from './playlist.service'

class PlaylistController {
  async getAll(req, res, next) {
    try {
      const data = await PlaylistService.getAll(req.query)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    const id = req.params.id
    try {
      const data = await PlaylistService.getById(id)
      return res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await PlaylistService.create(req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const id = req.params.id
    try {
      const data = await PlaylistService.update(id, req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const id = req.params.id
    try {
      const data = await PlaylistService.findByIdAndDelete(id)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }
}

export default new PlaylistController()
