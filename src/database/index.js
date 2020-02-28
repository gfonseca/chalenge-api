
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

mongoose.Promise = global.Promise

module.exports = mongoose
