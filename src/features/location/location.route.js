import express from 'express'
const router = express.Router()
import LocationController from './location.controller'

router.get('/', LocationController.getList)

export default router
