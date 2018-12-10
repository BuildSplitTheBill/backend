exports.seed = knex =>
  knex('obligations')
    .truncate()
    .then(() =>
      knex('obligations').insert([
        {
          id: 1,
          bill_id: 1,
          user_id: 1,
          is_owner: true,
          paid: true,
          date_paid: 'now'
        }
      ])
    )
