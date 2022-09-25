import createError from 'http-errors'
import { encodeString, verifyString } from '../../utils/auth'
import OTP from './otp.model'
import User from '../user/user.model'
import OTP from './otp.model'
import { forgottenPasswordType } from '../../constants/otp.constant'

class OTPService {
  async generate({ email, type = forgottenPasswordType }) {
    try {
      const user = User.findOne({ email })
      if (!user) {
        throw createError.BadRequest('Email is invalid')
      }
      const otp = generateOTP()
      const encodeOTP = await encodeString(otp)

      await OTP.save({
        email,
        type,
        otp: encodeOTP,
      })

      return {
        otp: otp,
        type: type,
        email,
      }
    } catch (error) {
      throw error
    }
  }

  async check({ email, type = forgottenPasswordType, otp }) {
    try {
      const currentOTP = await OTP.findOne({
        email,
        type,
      })

      if (!currentOTP) {
        throw createError.BadRequest('Payload is not valid')
      }

      if (!await verifyString(otp, currentOTP.otp)) {
        throw createError.BadRequest('OTP is not valid')
      }

      await OTP.deleteMany({
        email,
        type
      })

      return true
    } catch (error) {
      throw error
    }
  }
}

export default new OTPService()
