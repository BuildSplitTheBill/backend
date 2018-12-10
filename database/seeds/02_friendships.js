exports.seed = knex =>
  knex('friendships')
    .truncate()
    .then(() =>
      knex('friendships').insert([{ id: 1, friend_1_id: 1, friend_2_id: 2 }])
    )
