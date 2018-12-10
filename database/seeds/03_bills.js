exports.seed = knex =>
  knex('bills')
    .truncate()
    .then(() => knex('bills').insert([{ id: 1, amount: 40, parties: 4 }]))
