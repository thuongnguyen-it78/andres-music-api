const mongoose = require('mongoose')
import { CITY_TYPE } from '../../constants/location.constant'

const citySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      default: CITY_TYPE,
    },
    parentId: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('city', citySchema, 'city')
