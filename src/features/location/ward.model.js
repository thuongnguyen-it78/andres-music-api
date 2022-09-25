const mongoose = require('mongoose')
import { WARD_TYPE } from '../../constants/location.constant'

const wardSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      default: WARD_TYPE,
    },
    parentId: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('ward', wardSchema, 'ward')
