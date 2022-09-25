const mongoose = require('mongoose')
import { COUNTRY_TYPE } from '../../constants/location.constant'


const countrySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      default: COUNTRY_TYPE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('country', countrySchema, 'country')
