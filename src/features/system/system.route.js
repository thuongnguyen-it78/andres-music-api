import express from 'express'
const router = express.Router()
import SystemController from './system.controller'

router.delete('/clear-user', SystemController.clearUser)
router.post('/create-user', SystemController.createUser)

router.delete('/clear-country', SystemController.clearCountry)
router.post('/create-country', SystemController.createCountry)

router.delete('/clear-city', SystemController.clearCity)
router.post('/create-city', SystemController.createCity)

router.delete('/clear-district', SystemController.clearDistrict)
router.post('/create-district', SystemController.createDistrict)

router.delete('/clear-ward', SystemController.clearWard)
router.post('/create-ward', SystemController.createWard)

export default router
