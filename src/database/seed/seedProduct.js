const getProductModel = require('../../Product/models/Product')
const fs = require('fs')
const path = require('path')
const util = require('util')
const dbHandler = require('../index')

const mockFile = path.join(__dirname, 'products-mock.json')

const seed = async () => {
  await dbHandler.clearDatabase()
  const Product = await getProductModel()
  const readFile = util.promisify(fs.readFile)
  const data = await readFile(mockFile)

  const products = JSON.parse(data)
  Object.keys(products).forEach(async (p, k) => {
    try {
      delete products[p]._id
      await Product.create(products[p])
    } catch (error) {
      console.error(error)
    }
  })

  return true
}

module.exports = seed
