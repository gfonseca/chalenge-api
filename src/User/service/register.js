const User = require('../models/User')

const register = async ({ name, email, password }) => {
  if (await User.findOne({ email })) {
    throw new Error('`email` already in use')
  }

  const user = new User({
    name,
    email,
    password
  })

  const fail = user.validateSync()
  const errorOutput = []
  if (fail) {
    Object.keys(fail.errors).forEach(e => {
      const err = fail.errors[e]
      errorOutput.push(err.message)
    })

    throw new Error(errorOutput.join('\n'))
  }

  return user
}

module.exports = register
