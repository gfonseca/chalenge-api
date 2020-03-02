const getUserModel = require('../models/User')

const register = async ({ name, email, password }) => {
  const User = await getUserModel()
  const testUser = await User.findOne({ email })
  if (testUser) {
    throw new Error('`email` already in use')
  }

  const user = new User({
    name,
    email
  })

  user.password = password
  const fail = user.validateSync()
  const errorOutput = []
  if (fail) {
    Object.keys(fail.errors).forEach(e => {
      const err = fail.errors[e]
      errorOutput.push(err.message)
    })

    throw new Error(errorOutput.join('\n'))
  }

  user.save()
  return user
}

module.exports = register
