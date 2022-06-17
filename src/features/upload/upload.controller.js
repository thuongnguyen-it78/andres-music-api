import { cloudinary } from '@/configs/cloudinary.config'
import fs from 'fs'
import { getPluralResponse, getSingleResponse } from '../../constants/response.constant'
import { OK } from '@/constants/http-code.constant'

class Upload {
  async single(req, res, next) {
    try {
      const data = await cloudinary.uploader.upload(req.file.path, {
        folder: 'images',
      })
      fs.unlinkSync(req.file.path)
      res.status(OK).json(
        getSingleResponse({
          imageName: req.file.originalname.split('.')[0],
          imageURL: data.url,
          imageId: data.public_id,
        })
      )
    } catch (error) {
      next(error)
    }
  }

  async multiple(req, res, next) {
    try {
      const imageList = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'images',
        })
        fs.unlinkSync(file.path)
        return {
          imageName: file.originalname.split('.')[0],
          imageURL: result.url,
          imageId: result.public_id,
        }
      })
      const resultList = await Promise.all(imageList)
      res.status(OK).json(getPluralResponse(resultList))
    } catch (error) {
      next(error)
    }
  }
}

export default new Upload()
