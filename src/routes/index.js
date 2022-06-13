import userRoute from '@/features/user/user.route'

function route(app) {
  app.use('/v1/users', userRoute)
}

export default route
