import userRoute from '../user/user.route'

function route(app) {
  app.use('/v1/users', userRoute)
}

export default route
