import User from '../../features/user/user.model'
import { signInWithCredential, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { auth } from '../../configs/firebase.config.js'
import { generateAccessToken, verifyString, encodeString } from '../../utils/auth'
import UserService from '../../features/user/user.service'
import createError from 'http-errors'
import { sendMail } from '../../utils/send-mail'

class AuthService {
  async register(data) {
    try {
      const result = await User.create(data)
      delete result._doc.password
      return result
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
      const user = await User.findOne({
        ...(Boolean(username) && { username }),
        ...(Boolean(email) && { email }),
      }).select('+password')

      if (!user) {
        throw createError.BadRequest('User does not exists')
      }

      if (!(await verifyString(password, user.password))) {
        throw createError.BadRequest('Password is invalid')
      }

      const accessToken = generateAccessToken({ userId: user._id })
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

  async changePassword(requestUser, { oldPassword, newPassword }) {
    try {
      if (!await verifyString(oldPassword, requestUser.password)) {
        throw createError.BadRequest('Password is invalid')
      }

      requestUser.password = await encodeString(newPassword)
      await requestUser.save()

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
        throw createError.BadRequest('Email is invalid')
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
