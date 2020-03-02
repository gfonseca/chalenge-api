
const express = require('express')
const userRoutes = require('./User/routes')
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
  }
}

module.exports = new AppController().express
