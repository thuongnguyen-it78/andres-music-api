import User from './user.model'

class UserService {
  async getAll({ page = 1, limit = 20, q = '' }) {
    page = Number.parseInt(page) - 1
    limit = Number.parseInt(limit)
    const query = q ? { name: new RegExp(q, 'i') } : {}
    try {
      const data = await User.find(query)
        .skip(page * limit)
        .limit(limit)
        .lean()

      const count = await User.find(query).count()
      return { data, pagination: { page, limit, count } }
    } catch (error) {
      throw error
    }
  }

  async getById(id) {
    try {
      const result = await User.findById(id)
      return result
    } catch (error) {
      throw error
    }
  }

  async create(data) {
    try {
      const result = await new User(data).save()
      delete result._doc.password
      return result
    } catch (error) {
      throw error
    }
  }

  async update(id, data) {
    try {
      const result = await User.findByIdAndUpdate(id, data, {
        new: true,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  async delete(id) {
    try {
      const result = await User.findByIdAndDelete(id)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default new UserService()
