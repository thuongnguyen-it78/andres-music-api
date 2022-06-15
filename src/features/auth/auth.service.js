import User from '@/features/user/user.model'
import { OAuth2Client } from 'google-auth-library'

class AuthService {
  async register() {
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

  async login() {
    try {
      return {}
    } catch (error) {
      throw error
    }
  }

  async loginWithFacebook(body) {
    try {
      const client = new OAuth2Client(GOOGLE_CLIENT_ID)

      const ticket = await client.verifyIdToken({
        idToken: body.token,
        audience: process.env.CLIENT_ID,
      })
      const { name, email, picture } = ticket.getPayload()
      console.log(ticket.getPayload())
      return {}
    } catch (error) {
      throw error
    }
  }

  async loginWithFacebook(body) {
    try {
      const client = new OAuth2Client(GOOGLE_CLIENT_ID)

      const ticket = await client.verifyIdToken({
        idToken: body.token,
        audience: process.env.CLIENT_ID,
      })
      const { name, email, picture } = ticket.getPayload()
      console.log(ticket.getPayload())
      return {}
    } catch (error) {
      throw error
    }
  }

  async changePassword() {
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

  async forgottenPassword() {
    try {
      return {}
    } catch (error) {
      throw error
    }
  }
}

export default new AuthService()
