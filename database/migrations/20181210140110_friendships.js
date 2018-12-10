// friendships connect users to other users
// the design of the scheme means that many-to-many relationships are possible

exports.up = knex =>
  knex.schema.createTable('friendships', friendships => {
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

exports.down = knex => knex.schema.dropTableIfExists('friendships')
