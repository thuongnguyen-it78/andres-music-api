import { DATABASE_URL } from '@/constants/env.constant'
const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connect successfully!!!')
    
    // all executed methods log output to console
    mongoose.set('debug', true)

    // disable colors in debug mode
    mongoose.set('debug', { color: false })

    // get mongodb-shell friendly output (ISODate)
    mongoose.set('debug', { shell: true })
  } catch (error) {
    console.log('Connect failure!!! \n ' + error)
    process.exit()
  }
}

export default connect
