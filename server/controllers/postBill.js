const db = require('../../database/dbConfig.js')

module.exports = async (req, res) => {
  const currentUser = req.session.name
  const { amount, parties } = req.body // parties is an array ids of all who need to pay

  try {
    // grab the id for the current user
    const currentUserId = await db('users')
      .where({ username: currentUser })
      .first()
      .then(({ id }) => id)

    // first, insert bill to bills table
    const billId = await db('bills')
      .insert({ amount, parties: parties.length })
      .then(id => id[0]) // grab the id from the returned array

    // insert owner's obligation
    await db('obligations').insert({
      bill_id: billId,
      user_id: currentUserId,
      is_owner: true,
      paid: true
    })

    // batch insert obligations for the rest of the parties
    const batchData = parties.map(id => ({
      bill_id: billId,
      user_id: id,
      is_owner: false,
      paid: false
    }))

    await db.batchInsert('obligations', batchData)

    res.status(200).json({ message: 'you have requested to add a bill' })
  } catch (error) {
    res.status(500).json({ message: 'error added items to database' })
  }
}
