function verifySession(req, res, next) {
  if (req.session && req.session.name) {
    next()
  } else {
    res.status(401).json({ message: 'cannot access that resource' })
  }
}

module.exports = verifySession
