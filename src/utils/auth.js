import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant'

export const encodePassword = async (password) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async (hash, password) => {
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

  const { user } = await jwt.verify(token, ACCESS_TOKEN_SECRET)
  return user
}
