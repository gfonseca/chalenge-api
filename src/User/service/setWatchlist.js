const getUserModel = require('../models/User')
const getProductModel = require('../../Product/models/Product')

const setWatchlist = async (userId, pid) => {
  const User = await getUserModel()
  const Product = await getProductModel()
  const user = await User.findById(userId)
  const product = await Product.findOne({ _id: pid })

  if (!product) {
    throw new Error('Product not exists')
  }

  if (user.watchlist.includes(product._id)) {
    throw new Error('Product already saved')
  }

  user.watchlist.push(pid)
  user.save()
}

module.exports = setWatchlist
