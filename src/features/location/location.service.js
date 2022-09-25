import City from './city.model'
import Country from './country.model'
import District from './district.model'
import Ward from './ward.model'

class LocationService {
  async getCountry() {
    try {
      const data = await Country.aggregate([
        {
          $lookup: {
            from: 'city',
            localField: 'id',
            foreignField: 'parentId',
            as: 'cityList',
          },
        },
      ])

      return data
    } catch (error) {
      throw error
    }
  }

  async getCity() {
    try {
      const data = await City.aggregate([
        {
          $lookup: {
            from: 'district',
            localField: 'id',
            foreignField: 'parentId',
            as: 'districtList',
          },
        },
        {
          $lookup: {
            from: 'country',
            localField: 'parentId',
            foreignField: 'id',
            as: 'parent',
          },
        },
        {
          $unwind: {
            path: '$parent',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      return data
    } catch (error) {
      throw error
    }
  }

  async getDistrict() {
    try {
      const data = await District.aggregate([
        {
          $lookup: {
            from: 'ward',
            localField: 'id',
            foreignField: 'parentId',
            as: 'wardList',
          },
        },
        {
          $lookup: {
            from: 'city',
            localField: 'parentId',
            foreignField: 'id',
            as: 'parent',
          },
        },
        {
          $unwind: {
            path: '$parent',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      return data
    } catch (error) {
      throw error
    }
  }

  async getWard() {
    try {
      const data = await Ward.aggregate([
        {
          $lookup: {
            from: 'district',
            localField: 'parentId',
            foreignField: 'id',
            as: 'parent',
          },
        },
        {
          $unwind: {
            path: '$parent',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      return data
    } catch (error) {
      throw error
    }
  }
}

export default new LocationService()
