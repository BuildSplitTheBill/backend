const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.session.name

  try {
    const friendsColumn1 = await db('users as u1')
      .where({ 'u1.username': currentUser })
      .join('friendships as f', { 'u1.id': 'f.friend_1_id' })
      .join('users as u2', { 'f.friend_2_id': 'u2.id' })
      .select('u2.id', 'u2.name')

    const friendsColumn2 = await db('users as u1')
      .where({ 'u1.username': currentUser })
      .join('friendships as f', { 'u1.id': 'f.friend_2_id' })
      .join('users as u2', { 'f.friend_1_id': 'u2.id' })
      .select('u2.id', 'u2.name')

    res.status(200).json([...friendsColumn1, ...friendsColumn2])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'database error fetching users' })
  }
}
