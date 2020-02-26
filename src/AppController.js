const express = require('express')
const userRoutes = require('./User/routes')

class AppController {
  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use('/user', userRoutes)
  }
}

module.exports = new AppController().express
