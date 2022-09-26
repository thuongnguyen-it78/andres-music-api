import createError from 'http-errors'
import { adminRole, userInactive } from '../constants/user.constant'
import { publicRouteList } from '../constants/auth.constant'
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

      if (requestUser.status === userInactive) {
        throw createError.NotAcceptable("User isn't active")
      }

      req.requestUser = requestUser
      next()
    } catch (error) {
      const result = publicRouteList.some(
        (publicRoute) =>
          req.originalUrl.indexOf(publicRoute.path) !== -1 && req.method === publicRoute.method
      )

      result ? next() : next(error)
    }
  }

  async requireLogin(req, res, next) {
    const requestUser = req.requestUser
    try {
      if (!requestUser) {
        throw createError.Unauthorized('Unauthorized')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

  async requireAdmin(req, res, next) {
    const requestUser = req.requestUser
    try {
      if (requestUser?.role < adminRole) {
        throw createError.Forbidden('Forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthMiddleware()
