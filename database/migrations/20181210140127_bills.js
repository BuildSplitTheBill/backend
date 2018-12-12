exports.up = knex =>
  knex.schema.createTable('bills', bills => {
    bills.increments()

    bills.float('amount').notNullable()
    bills.integer('parties') // number of people who will need to pay the bill
    bills.string('description', 1024)
    bills.date('date')
  })

exports.down = knex => knex.schema.dropTableIfExists('bills')
