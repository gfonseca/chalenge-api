const logMiddleware = async (req, res, next) => {
  console.log(JSON.stringify({
    time: new Date().toString(),
    headers: req.rawHeaders,
    url: req.url,
    params: req.query,
    body: req.body
  }))
  next()
}

module.exports = logMiddleware
