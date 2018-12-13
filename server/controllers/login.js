const bcrypt = require('bcryptjs')
const db = require('../../database/dbConfig.js')
const jwt = require('jsonwebtoken')
const jwtKey = 'lkj;lkj;lkjaf;lek'

function generateToken({ username }) {
  const payload = { username }
  const options = { expiresIn: '1d' }

  return jwt.sign(payload, jwtKey, options)
}

function login(req, res) {
  const { username, password } = req.body

  db('users')
    .where({ username })
    .first()
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken({ username })
        res.status(200).json({ message: 'you may pass', token })
      } else {
        res.status(401).json({ message: 'you shall not pass' })
      }
    })
    .catch(err => res.status(500).json(err))
}

module.exports = login
