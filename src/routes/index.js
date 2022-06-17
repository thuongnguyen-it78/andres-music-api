import express from 'express'
const router = express.Router()

import authRoute from '@/features/auth/auth.route'
import uploadRoute from '@/features/upload/upload.route'
import userRoute from '@/features/user/user.route'
import tagRoute from '@/features/tag/tag.route'
import postRoute from '@/features/post/post.route'
import commentRoute from '@/features/comment/comment.route'
import songRoute from '@/features/song/song.route'
import playlistRoute from '@/features/playlist/playlist.route'


function route(app) {
  router.use('/auth', authRoute)
  router.use('/upload', uploadRoute)
  router.use('/users', userRoute)
  router.use('/tags', tagRoute)
  router.use('/posts', postRoute)
  router.use('/comments', commentRoute)
  router.use('/songs', songRoute)
  router.use('/playlist', playlistRoute)

  app.use('/v1', router)
}

export default route
