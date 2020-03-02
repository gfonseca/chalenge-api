const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod = null

module.exports.getDbUri = async () => {
  if (!mongod) {
    mongod = new MongoMemoryServer()
  }

  let uri = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME
  if (process.env.NODE_ENV === 'test') {
    uri = await mongod.getConnectionString()
  }

  return uri
}
