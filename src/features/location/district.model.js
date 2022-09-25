const mongoose = require('mongoose')
import { DISTRICT_TYPE } from '../../constants/location.constant'

const districtSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      default: DISTRICT_TYPE,
    },
    parentId: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('district', districtSchema, 'district')
