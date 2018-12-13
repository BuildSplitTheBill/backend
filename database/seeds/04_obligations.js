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
        },
        {
          id: 2,
          bill_id: 1,
          user_id: 2,
          is_owner: false,
          paid: true,
          date_paid: 'now'
        },
        {
          id: 3,
          bill_id: 1,
          user_id: 3,
          is_owner: false,
          paid: false,
          date_paid: 'now'
        },
        {
          id: 4,
          bill_id: 1,
          user_id: 4,
          is_owner: false,
          paid: false,
          date_paid: 'now'
        },
        {
          id: 5,
          bill_id: 2,
          user_id: 2,
          is_owner: true,
          paid: true,
          date_paid: 'now'
        },
        {
          id: 6,
          bill_id: 2,
          user_id: 3,
          is_owner: false,
          paid: false,
          date_paid: 'now'
        },
        {
          id: 7,
          bill_id: 2,
          user_id: 4,
          is_owner: false,
          paid: false,
          date_paid: 'now'
        },
        {
          id: 8,
          bill_id: 3,
          user_id: 1,
          is_owner: true,
          paid: true,
          date_paid: 'now'
        },
        {
          id: 9,
          bill_id: 3,
          user_id: 2,
          is_owner: false,
          paid: false,
          date_paid: 'now'
        },
        {
          id: 10,
          bill_id: 4,
          user_id: 1,
          is_owner: true,
          paid: true,
          date_paid: 'now'
        },
        {
          id: 11,
          bill_id: 4,
          user_id: 2,
          is_owner: false,
          paid: false,
          date_paid: 'now'
        },
        {
          id: 12,
          bill_id: 4,
          user_id: 3,
          is_owner: false,
          paid: true,
          date_paid: 'now'
        },
        {
          id: 13,
          bill_id: 4,
          user_id: 4,
          is_owner: false,
          paid: false,
          date_paid: 'now'
        },
        {
          id: 14,
          bill_id: 4,
          user_id: 1,
          is_owner: false,
          paid: true,
          date_paid: 'now'
        },
        {
          id: 15,
          bill_id: 4,
          user_id: 2,
          is_owner: false,
          paid: false,
          date_paid: 'now'
        },
        {
          id: 16,
          bill_id: 4,
          user_id: 3,
          is_owner: true,
          paid: true,
          date_paid: 'now'
        },
        {
          id: 17,
          bill_id: 4,
          user_id: 4,
          is_owner: false,
          paid: true,
          date_paid: 'now'
        }
      ])
    )
