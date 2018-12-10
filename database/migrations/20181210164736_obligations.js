// obligations connect users to bills

exports.up = knex =>
  knex.schema.createTable('obligations', obligations => {
    obligations.increments()

    obligations
      .integer('bill_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('bills')

    obligations
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')

    obligations.boolean('is_owner').defaultTo(false)
    obligations.boolean('paid').defaultTo(false)
    obligations.date('date_paid')
  })

exports.down = knex => knex.schema.dropTableIfExists('obligations')
