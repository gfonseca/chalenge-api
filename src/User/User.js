const mongoose = require('../database')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
