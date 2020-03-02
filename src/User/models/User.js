const db = require('../../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let User = null

const defineUser = async () => {
  const mongoose = await db.connect()

  const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    email: {
      type: String,
      unique: true,
      match: /[0-9a-zA-Z._-]+@[0-9a-zA-Z]+\.[a-z]{2,3}(\.[a-z]{2})?/,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    watchlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    ]
  })
  UserSchema.methods.signJWT = function () {
    return jwt.sign({ id: this._id }, process.env.APP_SECRET)
  }

  UserSchema.pre('save', async function (next) {
    var user = this

    if (!user.isModified('password')) return next()

    user.password = await bcrypt.hash(user.password, 8)
    next()
  })

  if (!User) {
    User = mongoose.model('User', UserSchema)
  }

  return User
}

module.exports = defineUser
