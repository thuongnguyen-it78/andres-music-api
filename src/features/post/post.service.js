import mongoose from 'mongoose'
import Post from './post.model'
const ObjectId = mongoose.Types.ObjectId

class PostService {
  async getAll({ page = 1, limit = 20, q = '' }) {
    page = Number.parseInt(page) - 1
    limit = Number.parseInt(limit)
    const query = q ? { name: new RegExp(q, 'i') } : {}
    try {
      const [data, count] = await Promise.all([
        Post.find(query)
          .skip(page * limit)
          .limit(limit),
        Post.find(query).count(),
      ])

      return { data, pagination: { page, limit, count } }
    } catch (error) {
      throw error
    }
  }

  async getById(id) {
    try {
      const result = await Post.aggregate([
        {
          $match: { _id: ObjectId(id) },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'creatorId',
            foreignField: '_id',
            as: 'creator',
          },
        },
        {
          $unwind: {
            path: '$creator',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      return result?.[0]
    } catch (error) {
      throw error
    }
  }

  async create(creator, data) {
    try {
      const payload = {
        creatorId: creator._id,
        ...data,
      }
      const result = await Post.create(payload)
      return result
    } catch (error) {
      throw error
    }
  }

  async createMultiple(creator, data) {
    try {
      const payload = data?.map((item) => ({
        ...item,
        creatorId: creator._id,
        slug: item.title.toLowerCase().replace(/ /g, '-'),
      }))
      const result = await Post.insertMany(payload)
      return result
    } catch (error) {
      throw error
    }
  }

  async update(id, data) {
    try {
      const result = await Post.findByIdAndUpdate(id, data, {
        new: true,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  async delete(id) {
    try {
      const result = await Post.findByIdAndDelete(id)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default new PostService()
