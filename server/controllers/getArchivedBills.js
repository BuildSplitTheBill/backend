const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.session.name
  console.log('running')

  try {
    const bills = await db('users as u1')
      .where({ 'u1.username': currentUser })
      .join('obligations as o', { 'u1.id': 'o.user_id' })
      .join('bills as b', { 'b.id': 'o.bill_id' })
      .select(
        'b.id',
        'o.is_owner',
        'o.paid',
        'o.date_paid',
        'b.amount',
        'b.parties'
      )
      .filter(bill => bill.paid == true)

    res.status(200).json(bills)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'database error fetching bills' })
  }
}
