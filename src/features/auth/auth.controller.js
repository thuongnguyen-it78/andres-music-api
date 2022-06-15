import { OK } from '@/constants/http-code.constant'
import { getSingleResponse } from '@/constants/response.constant'
import AuthService from './auth.service'

class AuthController {
  async register(req, res, next) {
    try {
      const data = await AuthService.register(req.body)
      return res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async verifyOTP(req, res, next) {
    try {
      const data = await AuthService.verifyOTP(req.body)
      return res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const data = await AuthService.login(req.body)
      return res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async loginWithGoogle(req, res, next) {
    try {
      const data = await AuthService.loginWithGoogle(req.body)
      return res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async loginWithFacebook(req, res, next) {
    try {
      const data = await AuthService.loginWithFacebook(req.body)
      return res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req, res, next) {
    try {
      const data = await AuthService.changePassword(req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async logOut(req, res, next) {
    try {
      const data = await AuthService.logOut(req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async forgottenPassword(req, res, next) {
    try {
      const data = await AuthService.forgottenPassword(req.body)
      res.status(OK).json(getSingleResponse(data))
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
