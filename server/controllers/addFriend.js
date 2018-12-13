const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.decoded.username
  const { id } = req.params

  try {
    // grab current user id
    const currentUserId = await db('users')
      .where({ username: currentUser })
      .first()
      .then(({ id }) => id)

    // insert new friendship
    await db('friendships as f').insert({
      friend_1_id: currentUserId,
      friend_2_id: id
    })

    res.status(200).json({ message: 'added friend' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'database error adding friend' })
  }
}
