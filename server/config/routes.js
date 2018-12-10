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
        res.status(200).json({ message: 'you may pass', token })
      } else {
        res.status(401).json({ message: 'you shall not pass' })
      }
    })
    .catch(err => res.status(500).json(err))
}

module.exports = { register, login }
