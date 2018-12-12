const jwt = require('jsonwebtoken')
const jwtKey = 'lkj;lkj;lkjaf;lek'

// function verifySession(req, res, next) {
//   if (req.session && req.session.name) {
//     next()
//   } else {
//     res.status(401).json({ message: 'cannot access that resource' })
//   }
// }

function verifySession(req, res, next) {
  const token = req.get('Authorization')

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err)

      req.decoded = decoded

      next()
    })
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    })
  }
}

module.exports = verifySession
