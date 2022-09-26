import User from './user.model'
import OTPService from '../otp/otp.service'
import { userActive } from '../../constants/user.constant'
import { sendMail } from '../../utils/send-mail'
import { sendCodeTemplate } from '../../utils/mail-template'

class UserService {
  async getAll({ page = 1, limit = 20, q = '' }) {
    page = Number.parseInt(page) - 1
    limit = Number.parseInt(limit)
    const query = q ? { name: new RegExp(q, 'i') } : {}
    try {
      const [data, count] = await Promise.all([
        User.find(query)
          .skip(page * limit)
          .limit(limit),
        User.find(query).count(),
      ])

      return { data, pagination: { page, limit, count } }
    } catch (error) {
      throw error
    }
  }

  async getById(id) {
    try {
      const result = await User.findById(id)
      return result
    } catch (error) {
      throw error
    }
  }

  async getBySocialId({ googleId, facebookId }) {
    try {
      const result = await User.findOne({
        ...(Boolean(googleId) && { googleId }),
        ...(Boolean(facebookId) && { facebookId }),
      })
      return result
    } catch (error) {
      throw error
    }
  }

  async create(data) {
    try {
      const result = await User.create(data)
      delete result._doc.password
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update(id, data) {
    try {
      const result = await User.findByIdAndUpdate(id, data, {
        new: true,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  async delete(id) {
    try {
      const result = await User.findByIdAndRemove(id)
      return result
    } catch (error) {
      throw error
    }
  }

  async checkEmailExists(email) {
    try {
      const user = await User.findOne({ email })
      return Boolean(user)
    } catch (error) {
      throw error
    }
  }

  async setActive({ email, type, otp }) {
    try {
      if (!(await OTPService.check({ email, type, otp }))) return false

      const user = await User.findOne({ email })
      user.status = userActive
      await user.save()
      return true
    } catch (error) {
      throw error
    }
  }

  async sendOTP({ email, type }) {
    try {
      const { otp, user } = await OTPService.generate({ email, type })

      await sendMail(email, sendCodeTemplate(otp, user), 'Kích hoạt tài khoản')

      return true
    } catch (error) {
      throw error
    }
  }
}

export default new UserService()
