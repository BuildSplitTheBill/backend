const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.decoded.username
  const { id } = req.params

  try {
    // grab by the bill id and join with other tables to get more relevant info
    // queries are a big backwards because they were migrated from another
    // route where that made sense
    const bills = await db('users as u1')
      .where({ 'u1.username': currentUser })
      .join('obligations as o', { 'u1.id': 'o.user_id' })
      .join('bills as b', { 'b.id': 'o.bill_id' })
      .where({ 'b.id': id }) // filtering by id here
      .select(
        'b.id',
        'o.is_owner',
        'o.paid',
        'o.date_paid',
        'b.amount',
        'b.parties'
      )

    res.status(200).json(bills)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'database error fetching bills' })
  }
}
