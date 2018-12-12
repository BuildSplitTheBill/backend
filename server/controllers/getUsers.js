const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.decoded.username

  try {
    const users = await db('users')
      .whereNot({ username: currentUser })
      .select('id', 'name')
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'database error fetching users' })
  }
}
