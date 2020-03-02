const getProductModel = require('../models/Product')

const getOne = async (id) => {
  const Product = await getProductModel()
  const product = await Product.findOne({ _id: id })

  if (!product) {
    throw new Error('Product not exists')
  }

  return {
    id: product.id,
    title: product.title,
    price: product.price,
    brand: product.brand,
    reviewScore: product.reviewScore,
    image: product.image
  }
}

module.exports = getOne
