const mongoose = require('mongoose')
const dbParams = require('./databaseParams')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongod = new MongoMemoryServer()

module.exports.connect = async () => {
  const uri = await dbParams.getDbUri()
  const mongooseOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }

  await mongoose.connect(uri, mongooseOpts)
  return mongoose
}

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
