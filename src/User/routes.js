const express = require('express')
const { register } = require('./service/')
const router = express.Router()

router.post('/register', async (req, resp) => {
  const user = await register(req.body)
  resp.status(200).send(user)
})

module.exports = router
