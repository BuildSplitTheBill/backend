const bcrypt = require('bcryptjs')
const db = require('../../database/dbConfig.js')

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

module.exports = logout
