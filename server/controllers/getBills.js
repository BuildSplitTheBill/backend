const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.decoded.username

  try {
    // grab current user id
    const currentUserId = await db('users')
      .where({ username: currentUser })
      .first()
      .then(({ id }) => id)

    // grab bills you are owed
    const billsUserIsOwed = await db('obligations as o1')
      .where({
        'o1.user_id': currentUserId,
        'o1.is_owner': 1
      })
      .join('obligations as o2', { 'o1.bill_id': 'o2.bill_id' })
      .where({ 'o2.paid': 0 })
      .join('users as u', { 'u.id': 'o2.user_id' })
      .join('bills as b', { 'b.id': 'o1.bill_id' })
      .select(
        'b.id as billId',
        'b.description',
        'o2.id as obligationId',
        'u.name',
        'o2.paid',
        'b.amount',
        'b.parties'
      )
      .then(obligations =>
        obligations.map(
          ({
            billId,
            description,
            obligationId,
            name,
            paid,
            amount,
            parties
          }) => ({
            bill_id: billId,
            description,
            obligation_id: obligationId,
            name,
            paid: !!paid,
            amount: Math.floor(amount / parties)
          })
        )
      )

    // grab all the obligations the user owes
    const billsUserOwes = await db('obligations as o1')
      .where({
        'o1.user_id': currentUserId,
        'o1.is_owner': 0,
        'o1.paid': 0
      })
      .join('obligations as o2', { 'o1.bill_id': 'o2.bill_id' })
      .where({ 'o2.is_owner': 1 })
      .join('users as u', { 'u.id': 'o2.user_id' })
      .join('bills as b', { 'b.id': 'o1.bill_id' })
      .select(
        'o2.id as obligationId',
        'u.name',
        'o1.paid',
        'o1.date_paid',
        'b.amount',
        'b.parties',
        'b.description',
        'b.id as billId'
      )
      .then(obligations =>
        obligations.map(
          ({
            obligationId,
            name,
            paid,
            date_paid,
            amount,
            parties,
            description,
            billId
          }) => ({
            id: billId,
            name,
            paid: !!paid,
            date_paid,
            amount: Math.floor(amount / parties),
            description,
            obligation_id: obligationId
          })
        )
      )

    const allObligations = {
      billsUserOwes,
      billsUserIsOwed
    }

    res.status(200).json(allObligations)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'database error fetching bills' })
  }
}
