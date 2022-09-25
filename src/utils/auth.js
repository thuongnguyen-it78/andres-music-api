import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant'
import otpGenerator from 'otp-generator'

export const generateOTP = () => {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })
}

export const encodeString = async (password) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export const verifyString = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

export const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24,
  })
}

export const verifyAccessToken = async (token) => {
  if (!token) {
    return null
  }

  const { userId } = await jwt.verify(token, ACCESS_TOKEN_SECRET)
  return { userId }
}
