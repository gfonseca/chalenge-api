
const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo/users', { useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = mongoose
