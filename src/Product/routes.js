const express = require('express')
const { list, getOne } = require('./service/')

const router = express.Router()

router.get('/:pid', async (req, res) => {
  try {
    if (!req.params.pid.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Product not exists')
    }

    const product = await getOne(req.params.pid)

    res.status(200).send(product)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await list(req.query.page)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
