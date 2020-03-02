
const express = require('express')
const userRoutes = require('./User/routes')
const productRoutes = require('./Product/routes')
const { logMiddleware } = require('./middlewares')
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class AppController {
  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())

    if (process.env.NODE_ENV !== 'test') {
      this.express.use(logMiddleware)
    }
  }

  routes () {
    this.express.use('/user', userRoutes)
    this.express.use('/product', productRoutes)
  }
}

module.exports = new AppController().express
