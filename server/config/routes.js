const bcrypt = require('bcryptjs')
const db = require('../../database/dbConfig.js')

function register(req, res) {
  console.log('here')
  const { username, password } = req.body

  const hash = bcrypt.hashSync(password, 4)
  db('users')
    .insert({ username, password: hash })
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err))
}

function login(req, res) {
  const { username, password } = req.body

  db('users')
    .where({ username })
    .first()
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.name = username
        res.status(200).json({ message: 'you may pass', token })
      } else {
        res.status(401).json({ message: 'you shall not pass' })
      }
    })
    .catch(err => res.status(500).json(err))
}

function logout(req, res) {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out')
      } else {
        res.send('you were logged out successfully')
      }
    })
  }
}

function verifySession(req, res, next) {
  if (req.session && req.session.name) {
    next()
  } else {
    res.status(401).json({ message: 'cannot access that resource' })
  }
}

module.exports = { register, login, logout, verifySession }
