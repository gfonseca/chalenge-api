const express = require('express')
const { register, auth, setWatchlist } = require('./service/')
const { authMiddleware } = require('../middlewares')
const getUserModel = require('../User/models/User')
const getProductModel = require('../Product/models/Product')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body)

    res.status(201).send({
      email: user.email,
      name: user.name
    })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get('/', authMiddleware, async (req, res) => {
  const User = await getUserModel()
  const user = await User.findOne({ _id: req.userId })
  res.status(200).send({
    name: user.name,
    email: user.email,
    id: user._id
  })
})

router.post('/watchlist/', authMiddleware, async (req, res) => {
  try {
    if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Product not exists')
    }

    await setWatchlist(req.userId, req.body.id)
    res.status(201).send()
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get('/watchlist/', authMiddleware, async (req, res) => {
  const User = await getUserModel()
  const Product = await getProductModel()
  const user = await User.findById(req.userId)
  const products = await Product.find({ _id: user.watchlist })
  res.status(200).send({
    products: products.map(p => {
      return {
        id: p.id,
        title: p.title,
        price: p.price,
        brand: p.brand,
        image: p.image,
        reviewScore: p.reviewScore
      }
    })
  })
})

router.post('/auth/', async (req, res) => {
  try {
    const user = await auth(req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
})

module.exports = router
