import createError from 'http-errors'
import { encodeString, verifyString, generateOTP } from '../../utils/auth'
import OTP from './otp.model'
import User from '../user/user.model'
import { forgottenPasswordType } from '../../constants/otp.constant'

class OTPService {
  async generate({ email, type = forgottenPasswordType }) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw createError.BadRequest('Email is invalid')
      }
      const otp = generateOTP()
      const encodeOTP = await encodeString(otp)

      await new OTP({
        email,
        type,
        otp: encodeOTP,
      }).save()

      return {
        email,
        otp: otp,
        type: type,
        user: user,
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

      if (!(await verifyString(otp, currentOTP.otp))) {
        throw createError.BadRequest('OTP is not valid')
      }

      await OTP.deleteMany({
        email,
        type,
      })

      return true
    } catch (error) {
      throw error
    }
  }
}

export default new OTPService()
