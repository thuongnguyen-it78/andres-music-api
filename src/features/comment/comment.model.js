const mongoose = require('mongoose')
import { commentActive, commentInactive } from '@/constants/comment.constant'
import slug from 'mongoose-slug-generator'

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120,
}

mongoose.plugin(slug, options)

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'post',
    },
    replyToId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'post',
    },
    content: {
      type: String,
      required: true,
    },
    likeList: [{ type: mongoose.Types.ObjectId, ref: 'user', default: [] }],
    status: {
      type: Number,
      default: commentInactive,
      enum: [commentInactive, commentActive],
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

export default mongoose.model('comment', commentSchema, 'comment')
