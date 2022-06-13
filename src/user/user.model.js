const mongoose = require('mongoose')
import { userInactive, userMale, userRole } from '../constants/user.constant'

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    avatarURL: {
      type: String,
      default: null
    },
    dateOfBirth: {
      type: Date,
      default: null
    },
    gender: {
      type: Number,
      default: userMale
    },
    role: {
      type: Number,
      default: userRole,
    },
    status: {
      type: Number,
      default: userInactive,
    },
    delete: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('user', userSchema, 'user')
