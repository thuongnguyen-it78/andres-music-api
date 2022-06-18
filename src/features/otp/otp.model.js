const mongoose = require('mongoose')
import { loginType, forgottenPasswordType } from '@/constants/otp.constant'

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: [loginType, forgottenPasswordType],
    },
    time: {
      type: Date,
      default: Date.now,
      index: {
        expires: 30,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('otp', otpSchema, 'otp')
