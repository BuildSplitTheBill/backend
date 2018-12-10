const bcrypt = require('bcryptjs')
const db = require('../../database/dbConfig.js')

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

module.exports = login
