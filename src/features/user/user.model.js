const mongoose = require('mongoose')
import {
  userInactive,
  userActive,
  userMale,
  userFemale,
  userRole,
  adminRole,
} from '@/constants/user.constant'
import { checkIsEmail } from './user.validation'

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (email) {
          return checkIsEmail(email)
        },
        message: (props) => `${props.value} is not a valid email`,
      },
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: Number,
      default: userMale,
      enum: [userMale, userFemale],
    },
    tokenList: {
      type: Array,
      default: [],
    },
    role: {
      type: Number,
      default: userRole,
      enum: [userRole, adminRole],
    },
    status: {
      type: Number,
      default: userInactive,
      enum: [userInactive, userActive],
    },
    delete: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('user', userSchema, 'user')
