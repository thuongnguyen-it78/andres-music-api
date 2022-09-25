const mongoose = require('mongoose')
import {
  postActive, postInactive
} from '../../constants/post.constant'
import slug from 'mongoose-slug-generator'

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120,
}

mongoose.plugin(slug, options)

const postSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: { type: String, slug: 'title', slug_padding_size: 3, unique: true },
    status: {
      type: Number,
      default: postInactive,
      enum: [postInactive, postActive],
    },
    tagList: [{ type: mongoose.Types.ObjectId, ref: 'tag', default: [] }],
    likeList: [{ type: mongoose.Types.ObjectId, ref: 'user', default: [] }],
    saverList: [{ type: mongoose.Types.ObjectId, ref: 'user', default: [] }],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('post', postSchema, 'post')
