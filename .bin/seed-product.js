const seedProduct = require('../src/database/seed/seedProduct')
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
  })
console.log('starting Seed')
seedProduct().then((err, data) => {
    console.log(data)
    console.log('Finished.')
}).catch((err) => console.log)