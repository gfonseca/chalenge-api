const db = require('../../database')

let Product = null

const defineProduct = async () => {
  const mongoose = await db.connect()

  const ProductSchema = mongoose.Schema({
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      unique: true
    },
    brand: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    reviewScore: {
      type: Number,
      min: 0,
      max: 5
    }
  })

  if (!Product) {
    Product = mongoose.model('Product', ProductSchema)
  }

  return Product
}

module.exports = defineProduct
