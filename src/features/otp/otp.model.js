const mongoose = require('mongoose')
import { activeAccountType, forgottenPasswordType } from '../../constants/otp.constant'

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
    otp: {
      type: String,
      required: true,
      enum: [activeAccountType, forgottenPasswordType],
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
