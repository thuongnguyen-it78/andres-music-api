const mongoose = require('mongoose')
import {
  tagInactive,
  tagActive,
} from '@/constants/tag.constant'

const tagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: tagInactive,
      enum: [tagInactive, tagActive],
    },
    delete: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('tag', tagSchema, 'tag')
