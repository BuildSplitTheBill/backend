const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.decoded.username

  try {
    // grab the id and balance for the current user
    const [currentUserId, currentUserBalance] = await db('users')
      .where({ username: currentUser })
      .first()
      .then(({ id, balance }) => [id, balance])

    // grab all the obligations the user owes
    const obligationsUserOwes = await db('obligations as o1')
      .where({
        'o1.user_id': currentUserId,
        'o1.is_owner': 0,
        'o1.paid': 0
      })
      .join('obligations as o2', { 'o1.bill_id': 'o2.bill_id' })
      .where({ 'o2.is_owner': 1 })
      .join('users as u', { 'u.id': 'o2.user_id' })
      .join('bills as b', { 'b.id': 'o1.bill_id' })
      .select('o2.id', 'u.name', 'b.amount', 'b.parties')
      .then(obligations =>
        obligations.map(({ id, name, amount, parties }) => ({
          id,
          name,
          amount: Math.floor(amount / parties)
        }))
      )

    // grab all the obligations the user is owed
    const obligationsUserIsOwed = await db('obligations as o1')
      .where({
        'o1.user_id': currentUserId,
        'o1.is_owner': 1
      })
      .join('obligations as o2', { 'o1.bill_id': 'o2.bill_id' })
      .where({ 'o2.paid': 0 })
      .join('users as u', { 'u.id': 'o2.user_id' })
      .join('bills as b', { 'b.id': 'o1.bill_id' })
      .select('o2.id', 'u.name', 'b.amount', 'b.parties')
      .then(obligations =>
        obligations.map(({ id, name, amount, parties }) => ({
          id,
          name,
          amount: Math.floor(amount / parties)
        }))
      )

    // calculate total user owes
    const totalUserOwes = obligationsUserOwes.reduce(
      (total, obligation) => total + obligation.amount,
      0
    )

    // calculate total user is owed
    const totalUserIsOwed = obligationsUserIsOwed.reduce(
      (total, obligation) => total + obligation.amount,
      0
    )

    res.status(200).json({
      balance: currentUserBalance,
      amountUserOwes: totalUserOwes,
      amountUserIsOwed: totalUserIsOwed,
      obligationsUserOwes: obligationsUserOwes,
      obligationsUserIsOwed: obligationsUserIsOwed
    })
  } catch (error) {
    res.status(500).json({ message: 'error fetching information' })
  }
}
