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
    const obligationsUserIsOwed = await db('obligations as o1')
      .where({
        'o1.user_id': currentUserId,
        'o1.is_owner': 1
      })
      .join('obligations as o2', { 'o1.bill_id': 'o2.bill_id' })
      .where({ 'o2.paid': 0 })
      .join('users as u', { 'u.id': 'o2.user_id' })
      .join('bills as b', { 'b.id': 'o1.bill_id' })
      .select('o2.id', 'u.name', 'o2.paid', 'b.amount', 'b.parties')
      .then(obligations =>
        obligations.map(({ id, name, paid, amount, parties }) => ({
          id,
          name,
          paid: !!paid,
          amount: Math.floor(amount / parties)
        }))
      )

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
      .select(
        'o2.id',
        'u.name',
        'o1.paid',
        'o1.date_paid',
        'b.amount',
        'b.parties',
        'b.description'
      )
      .then(obligations =>
        obligations.map(
          ({ id, name, paid, date_paid, amount, parties, description }) => ({
            id,
            name,
            paid: !!paid,
            date_paid,
            amount: Math.floor(amount / parties),
            description
          })
        )
      )

    const allObligations = {
      obligationsUserOwes,
      obligationsUserIsOwed
    }

    res.status(200).json(allObligations)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'database error fetching bills' })
  }
}

// // bills for others
// [
//   {
//     id: 1,
//    description: 'some words',
//     parties: [
//       {
//         name: 'Samuel',
//         amount: 10,
//         paid: true,
//         date_paid: 'some time ago'
//       },
//       {
//         name: 'David',
//         amount: 10,
//         paid: false,
//         date_paid: null
//       }
//     ]
//   }
//  ]

//  // bills for self
//  [
//   {
//       "id": 1,
//       "owner": Tom
//       "paid": false,
//       "date_paid": null,
//       "amount": 10
//   }
// ]
