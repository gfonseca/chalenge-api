const formatMongoErrors = (errors) => {
  const errorOutput = []

  Object.keys(fail.errors).forEach(e => {
    const err = fail.errors[e]
    errorOutput.push(err.message)
  })

  return errorOutput.join('\n')
}

module.exports = formatMongoErrors
