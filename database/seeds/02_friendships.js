exports.seed = knex =>
  knex('friendships')
    .truncate()
    .then(() =>
      knex('friendships').insert([
        { id: 1, friend_1_id: 1, friend_2_id: 2 },
        { id: 2, friend_1_id: 1, friend_2_id: 3 },
        { id: 3, friend_1_id: 1, friend_2_id: 4 },
        { id: 4, friend_1_id: 2, friend_2_id: 3 },
        { id: 5, friend_1_id: 2, friend_2_id: 4 },
        { id: 6, friend_1_id: 3, friend_2_id: 4 }
      ])
    )
