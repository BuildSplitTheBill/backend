exports.seed = knex =>
  knex('bills')
    .truncate()
    .then(() =>
      knex('bills').insert([
        {
          id: 1,
          amount: 40,
          parties: 4,
          description: 'a dinner at green apple',
          date: null
        },
        {
          id: 2,
          amount: 200,
          parties: 3,
          description: 'drinks at the bar',
          date: null
        }
      ])
    )
