
const express = require('express')
const userRoutes = require('./User/routes')
const productRoutes = require('./Product/routes')
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
      this.express.use((req, res, next) => {
        console.log('Wating mongoose', uri)
        console.log(JSON.stringify({
          time: new Date().toString(),
          headers: req.rawHeaders,
          url: req.url,
          params: req.query,
          body: req.body
        }))
        next()
      })
    }
  }

  routes () {
    this.express.use('/user', userRoutes)
    this.express.use('/product', productRoutes)
  }
}

module.exports = new AppController().express
