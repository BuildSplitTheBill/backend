const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.decoded.username
  const { id } = req.params

  try {
    // grab the id for the current user
    const [currentUserId, currentUserBalance] = await db('users')
      .where({ username: currentUser })
      .first()
      .then(({ id, balance }) => [id, balance])

    // grab the id of the obligation associated with
    // that user and that bill
    const [obligationId, obligationAmount] = await db('bills as b')
      .where({ 'b.id': id })
      .join('obligations as o', { 'b.id': 'o.bill_id' })
      .where({ 'o.user_id': currentUserId })
      .select('o.id', 'b.amount', 'b.parties')
      .first()
      .then(({ id, amount, parties }) => [id, amount / parties])

    // grab the bill owners id and name
    const [billOwnerId, billOwnerName, billOwnerBalance] = await db(
      'bills as b'
    )
      .where({ 'b.id': id })
      .join('obligations as o', { 'b.id': 'o.bill_id' })
      .where({ 'o.is_owner': 1 })
      .join('users as u', { 'o.user_id': 'u.id' })
      .select('u.id', 'u.name', 'u.balance')
      .first()
      .then(({ id, name, balance }) => [id, name, balance])

    // remove from users balance
    await db('users as u')
      .where({ 'u.id': currentUserId })
      .update({ balance: currentUserBalance - obligationAmount })

    // add to bill owners balance
    await db('users as u')
      .where({ 'u.id': billOwnerId })
      .update({ balance: billOwnerBalance + obligationAmount })

    // mark obligation as paid
    await db('obligations as o')
      .where({ 'o.id': obligationId })
      .update({ paid: true, date_paid: Date.now() })

    res
      .status(200)
      .json({ message: `you paid ${billOwnerName} $${obligationAmount}` })
  } catch (error) {
    res.status(500).json({ message: 'error paying item in database' })
  }
}
