import User from '@/features/user/user.model'
import { signInWithCredential, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { auth } from '@/configs/firebase.config.js'
import { generateAccessToken } from '@/utils/auth'
import UserService from '@/features/user/user.service'

class AuthService {
  async register(body) {
    try {
      return {}
    } catch (error) {
      throw error
    }
  }

  async verifyOTP() {
    try {
      return {}
    } catch (error) {
      throw error
    }
  }

  async login({ username, email, password }) {
    try {
      return {}
    } catch (error) {
      throw error
    }
  }

  async loginWithGoogle({ googleToken }) {
    try {
      const credential = GoogleAuthProvider.credential(googleToken)
      const value = await signInWithCredential(auth, credential)
      const uid = value.user.uid

      const { fullName, email, photoUrl, dateOfBirth } = value.user.reloadUserInfo[0]

      // check user exists by socialId
      let user = await UserService.getBySocialId({ googleId: uuid })

      // doest not exists -> create user -> generate access_token
      if (!user) {
        user = await UserService.create({
          fullName,
          email,
          dateOfBirth,
          avatarURL: photoUrl,
          googleId: uid,
        })
      }

      // exists -> generate access_token
      const accessToken = generateAccessToken(user)

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

      const { fullName, email, photoUrl, dateOfBirth } = value._tokenResponse
      let user = await UserService.getBySocialId({ facebookId: uuid })
      if (!user) {
        user = await UserService.create({
          fullName,
          email,
          dateOfBirth,
          avatarURL: photoUrl,
          facebook: uid,
        })
      }

      const accessToken = generateAccessToken(user)

      return {
        user,
        token: accessToken,
      }
    } catch (error) {
      throw error
    }
  }

  async changePassword({ password, newPassword }) {
    try {
      return {}
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
      return {}
    } catch (error) {
      throw error
    }
  }
}

export default new AuthService()
