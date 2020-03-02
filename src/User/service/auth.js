const getUserModel = require('../models/User')
const bcrypt = require('bcrypt')
const { formatMongoErrors } = require('../../utils')

const auth = async ({ email, password }) => {
  const User = await getUserModel()
  const user = await User.findOne({ email: email })

  if (!user) {
    throw new Error('User not found')
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid password')
  }

  return { token: await user.signJWT() }
}

module.exports = auth
