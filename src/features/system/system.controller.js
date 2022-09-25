import { OK } from '../../constants/http-code.constant'
import { getPluralResponse } from '../../constants/response.constant'
import Country from '../location/country.model'
import City from '../location/city.model'
import District from '../location/district.model'
import Ward from '../location/ward.model'

import User from '../user/user.model'
import { sendMail } from '../../utils/send-mail'
import { sendCodeTemplate } from '../../utils/mail-template'

class SystemController {
  async clearUser(req, res, next) {
    try {
      const data = await User.remove({})
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async createUser(req, res, next) {
    try {
      const data = await User.insertMany(req.body)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async clearCountry(req, res, next) {
    try {
      const data = await Country.remove({})
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async createCountry(req, res, next) {
    try {
      const data = await Country.insertMany(req.body)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async clearCity(req, res, next) {
    try {
      const data = await City.remove({})
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async createCity(req, res, next) {
    try {
      const data = await City.insertMany(req.body)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async clearDistrict(req, res, next) {
    try {
      const data = await District.remove({})
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async createDistrict(req, res, next) {
    try {
      const data = await District.insertMany(req.body)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async clearWard(req, res, next) {
    try {
      const data = await Ward.remove({})
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async createWard(req, res, next) {
    try {
      const data = await Ward.insertMany(req.body)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }

  async sendMail(req, res, next) {
    try {
      const { receiver, content } = req.body
      const data = await sendMail(receiver, sendCodeTemplate(content))
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)   
    }
  }
}

export default new SystemController()
