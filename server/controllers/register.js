const bcrypt = require('bcryptjs')
const db = require('../../database/dbConfig.js')

function register(req, res) {
  const { password } = req.body

  const hash = bcrypt.hashSync(password, 4)
  db('users')
    .insert({ ...req.body, password: hash })
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err))
}

module.exports = register
