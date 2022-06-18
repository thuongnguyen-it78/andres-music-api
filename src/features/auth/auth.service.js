import User from '@/features/user/user.model'
import { signInWithCredential, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { auth } from '@/configs/firebase.config.js'
import { generateAccessToken } from '../../utils/auth'
import UserService from '@/features/user/user.service'
import createError from 'http-errors'
import { sendMail } from '../../utils/send-mail'

class AuthService {
  async register({ fullName, email, password }) {
    try {
      return {}
    } catch (error) {
      throw error
    }
  }

  async verifyOTP({ email, otpCode }) {
    try {
      const otpList = OTPService({
        email,
        type: 'login',
      })
      const activeOTP = otpList.at(-1)
      if (!checkOTP(otpCode, activeOTP.code)) {
        createError('OTP is invalid')
      }
      return true
    } catch (error) {
      throw error
    }
  }

  async login({ username, email, password }) {
    try {
      const user = User.find({
        ...(Boolean(username) && { username }),
        ...(Boolean(email) && { email }),
      }).select('+password')

      if (user) {
        createError.BadRequest('User does not exists')
      }

      if (!checkPassword(password, user.password)) {
        createError.BadRequest('Password is invalid')
      }

      const accessToken = generateAccessToken({ _id: user._id })
      delete user._doc.password
      return {
        token: accessToken,
        user,
      }
    } catch (error) {
      throw error
    }
  }

  async loginWithGoogle({ googleToken }) {
    try {
      const credential = GoogleAuthProvider.credential(googleToken)
      const value = await signInWithCredential(auth, credential)
      const { uid, displayName, email, photoURL, dateOfBirth, phoneNumber } =
        value.user.providerData[0]

      // check user exists by socialId
      let user = await UserService.getBySocialId({ googleId: uid })

      // doest not exists -> create user -> generate access_token
      if (!user) {
        user = await UserService.create({
          email,
          dateOfBirth,
          phoneNumber,
          googleId: uid,
          fullName: displayName,
          avatarURL: photoURL,
        })
      }

      // exists -> generate access_token
      const accessToken = generateAccessToken({ _id: user._id })

      return {
        user,
        token: accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  async loginWithFacebook({ facebookToken }) {
    try {
      const credential = FacebookAuthProvider.credential(facebookToken)
      const value = await signInWithCredential(auth, credential)
      const uid = value.user.uid
      const { fullName, email, photoUrl, dateOfBirth, phoneNumber } = value._tokenResponse

      let user = await UserService.getBySocialId({ facebookId: uid })
      if (!user) {
        user = await UserService.create({
          fullName,
          email,
          dateOfBirth,
          phoneNumber,
          avatarURL: photoUrl,
          facebookId: uid,
        })
      }

      const accessToken = generateAccessToken({ _id: user._id })

      return {
        user,
        token: accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  async changePassword(requestUser, { password, newPassword }) {
    try {
      const user = User.findById(requestUser._id).select('+password')
      if (!user) {
        createError.NotFound('User does not exists')
      }

      if (!checkPassword(password, user.password)) {
        createError('Password is invalid')
      }

      user.password = generatePassword(newPassword)

      return true
    } catch (error) {
      throw error
    }
  }

  async logout() {
    try {
      return {}
    } catch (error) {
      throw error
    }
  }

  async forgottenPassword({ email }) {
    try {
      const user = User.findOne({ email: email })
      if (!user) {
        createError.BadRequest('Email is invalid')
      }

      const otpCode = generateOTP()
      sendMail(user.email, user.fullName, otpCode)
      return true
    } catch (error) {
      throw error
    }
  }
}

export default new AuthService()
