exports.up = knex =>
  knex.schema.createTable('friedships', users => {
    friendships.increments()

    friendships
      .integer('friend_1_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')

    friendships
      .integer('friend_2_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
  })

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('friendships')
