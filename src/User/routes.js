const express = require('express')
const { register, auth } = require('./service/')
const { authMiddleware } = require('../middlewares')
const getUserModel = require('../User/models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const user = await register(req.body)
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get('/', authMiddleware, async (req, res) => {
  const User = await getUserModel()
  const user = await User.findOne({ _id: req.userId })
  res.status(200).send(user)
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
