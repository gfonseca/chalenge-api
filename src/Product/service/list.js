const getProductModel = require('../models/Product')

const list = async (reqPage) => {
  const Product = await getProductModel()
  const numOfProducts = await Product.countDocuments()
  const pPage = 10 // results per page
  const page = parseInt(reqPage) || 1
  const totalPages = Math.ceil(numOfProducts / pPage)

  const products = await Product.find({})
    .skip((page * pPage) - pPage)
    .limit(pPage)
    .select('-_v')

  return {
    products: products.map(p => {
      return {
        id: p._id,
        title: p.title,
        price: p.price,
        brand: p.brand,
        image: p.image,
        reviewScore: p.reviewScore
      }
    }),
    numOfProducts,
    currentPage: page,
    totalPages: totalPages
  }
}

module.exports = list
