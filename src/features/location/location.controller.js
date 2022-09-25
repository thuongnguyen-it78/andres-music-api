import { OK } from '../../constants/http-code.constant'
import { CITY_TYPE, COUNTRY_TYPE, DISTRICT_TYPE, WARD_TYPE } from '../../constants/location.constant'
import { getPluralResponse } from '../../constants/response.constant'
import Location from './location.service'

class LocationController {
  async getList(req, res, next) {
    const type = req.query.type || 4
    const typeMapFunction = {
      [COUNTRY_TYPE]: 'getCountry',
      [CITY_TYPE]: 'getCity',
      [DISTRICT_TYPE]: 'getDistrict',
      [WARD_TYPE]: 'getWard',
    }
    try {
      const data = await Location?.[typeMapFunction[type]]?.(req.query)
      return res.status(OK).json(getPluralResponse(data))
    } catch (error) {
      next(error)
    }
  }
}

export default new LocationController()
