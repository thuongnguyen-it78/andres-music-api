import createError from 'http-errors'
import { userInactive } from '../constants/user.constant'
import User from '../features/user/user.model'
import { verifyAccessToken } from '../utils/auth'


class AuthMiddleware {
  async verifyUser(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
      if (token == null) {
        throw createError.Unauthorized('Token is empty')
      }

      const { userId } = await verifyAccessToken(token)

      const requestUser = await User.findById(userId).select('+password')
      
      if (!requestUser) {
        throw createError.BadRequest("User doesn't exists")
      }
      
      // if (requestUser.status === userInactive) {
      //   throw createError.NotAcceptable("User isn't active")
      // }

      req.requestUser = requestUser
      next()
    } catch (error) {
      next(error)  
    }
  }

  async verifyPermission(req, res, next) {
    const user = req.user
    try {
      if (user.role < 1) {
        throw createError.Forbidden('Forbidden')
      }
    } catch (error) {
      next(error)
    }
  }

  async checkLogin(req, res, next) {
    if (!req.user) {
      next(createError.Unauthorized('Unauthorized'))
      return
    }
    next()
  }
}

export default new AuthMiddleware()
