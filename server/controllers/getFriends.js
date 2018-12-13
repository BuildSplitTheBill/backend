const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.decoded.username

  try {
    // in our database we have two columns in the friends table
    // friend_1_id and friend_2_id that designate connections
    // because who might be in which column could be random
    // we need to query each column of the table for instances
    // of the user id, grab the corresponding user id (the friend)
    // and lookup that user id in the users table. We then join these
    // togethher to get a list of a users friends.

    const friendsColumn1 = await db('users as u1')
      .where({ 'u1.username': currentUser })
      .join('friendships as f', { 'u1.id': 'f.friend_1_id' })
      .join('users as u2', { 'f.friend_2_id': 'u2.id' })
      .select('u2.id', 'u2.name', 'u2.email')

    const friendsColumn2 = await db('users as u1')
      .where({ 'u1.username': currentUser })
      .join('friendships as f', { 'u1.id': 'f.friend_2_id' })
      .join('users as u2', { 'f.friend_1_id': 'u2.id' })
      .select('u2.id', 'u2.name', 'u2.email')

    res.status(200).json([...friendsColumn1, ...friendsColumn2])
  } catch (error) {
    res.status(500).json({ message: 'database error fetching users' })
  }
}
