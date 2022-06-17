import { OK } from '@/constants/http-code.constant'
import { getSingleResponse, getPluralResponse } from '@/constants/response.constant'
import SongService from './song.service'

class SongController {
  async getAll(req, res, next) {
    try {
      const data = await SongService.getAll(req.query)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    const id = req.params.id
    try {
      const data = await SongService.getById(id)
      return res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await SongService.create(req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const id = req.params.id
    try {
      const data = await SongService.update(id, req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const id = req.params.id
    try {
      const data = await SongService.findByIdAndDelete(id)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }
}

export default new SongController()
