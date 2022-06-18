import OTP from './otp.model'

class OTPService {
  async getAll({ page = 1, limit = 20, q = '' }) {
    page = Number.parseInt(page) - 1
    limit = Number.parseInt(limit)
    const query = q ? { name: new RegExp(q, 'i') } : {}
    try {
      const [data, count] = await Promise.all([
        OTP.find(query)
          .skip(page * limit)
          .limit(limit),
        OTP.find(query).count(),
      ])

      return { data, pagination: { page, limit, count } }
    } catch (error) {
      throw error
    }
  }

  async getById(id) {
    try {
      const result = await OTP.findById(id)
      return result
    } catch (error) {
      throw error
    }
  }

  async create(data) {
    try {
      const result = await OTP.create(data)
      return result
    } catch (error) {
      throw error
    }
  }

  async update(id, data) {
    try {
      const result = await OTP.findByIdAndUpdate(id, data, {
        new: true,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  async delete(id) {
    try {
      const result = await OTP.findByIdAndDelete(id)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default new OTPService()
