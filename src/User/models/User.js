const mongoose = require('../../database')

function isMyFieldRequired () {
  return typeof this.myField !== 'string'
}

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    match: /[0-9a-zA-Z\._-]+@[0-9a-zA-Z]+\.[a-z]{2,3}(\.[a-z]{2})?/,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
