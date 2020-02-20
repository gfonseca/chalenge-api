
const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo/users', { useMongoClient: true })

module.exports = mongoose
