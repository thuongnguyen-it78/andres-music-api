import express from 'express';
const router = express.Router();

import authRoute from '@/features/auth/auth.route'
import uploadRoute from '@/features/upload/upload.route'
import userRoute from '@/features/user/user.route'


function route(app) {
  router.use('/v1/auth', authRoute)
  router.use('/v1/upload', uploadRoute)
  router.use('/v1/users', userRoute)

  app.use(router)
}

export default route
