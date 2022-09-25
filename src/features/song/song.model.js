const mongoose = require('mongoose')
import { songActive, songInactive } from '../../constants/song.constant'
import slug from 'mongoose-slug-generator'

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120,
}

mongoose.plugin(slug, options)

const songSchema = new mongoose.Schema(
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
    mediaURL: {
      type: String,
      required: true,
    },
    slug: { type: String, slug: 'title', slug_padding_size: 3, unique: true },
    status: {
      type: Number,
      default: songInactive,
      enum: [songInactive, songActive],
    },
    singerList: [{ type: mongoose.Types.ObjectId, ref: 'user', default: [] }],
    likeList: [{ type: mongoose.Types.ObjectId, ref: 'user', default: [] }],
    saverList: [{ type: mongoose.Types.ObjectId, ref: 'user', default: [] }],
    tagList: [{ type: mongoose.Types.ObjectId, ref: 'tag', default: [] }],
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

export default mongoose.model('song', songSchema, 'song')
