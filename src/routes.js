import express from 'express'
const router = express.Router()

import authRoute from './features/auth/auth.route'
import uploadRoute from './features/upload/upload.route'
import userRoute from './features/user/user.route'
import postRoute from './features/post/post.route'
import songRoute from './features/song/song.route'
import locationRoute from './features/location/location.route'
import systemRoute from './features/system/system.route'

function route(app) {
  router.use('/auth', authRoute)
  router.use('/uploads', uploadRoute)
  router.use('/users', userRoute)
  router.use('/posts', postRoute)
  router.use('/songs', songRoute)
  router.use('/locations', locationRoute)
  router.use('/systems', systemRoute)

  app.use('/api/v1', router)
}

export default route
