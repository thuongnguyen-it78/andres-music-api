import Playlist from './playlist.model'

class PlaylistService {
  async getAll({ page = 1, limit = 20, q = '' }) {
    page = Number.parseInt(page) - 1
    limit = Number.parseInt(limit)
    const query = q ? { name: new RegExp(q, 'i') } : {}
    try {
      const [data, count] = await Promise.all([
        Playlist.find(query)
          .skip(page * limit)
          .limit(limit),
        Playlist.find(query).count(),
      ])

      return { data, pagination: { page, limit, count } }
    } catch (error) {
      throw error
    }
  }

  async getById(id) {
    try {
      const result = await Playlist.findById(id)
      return result
    } catch (error) {
      throw error
    }
  }

  async create(data) {
    try {
      const result = await Playlist.create(data)
      return result
    } catch (error) {
      throw error
    }
  }

  async update(id, data) {
    try {
      const result = await Playlist.findByIdAndUpdate(id, data, {
        new: true,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  async delete(id) {
    try {
      const result = await Playlist.findByIdAndDelete(id)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default new PlaylistService()
