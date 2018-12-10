// all passwords are the user's name in all lowercase

exports.seed = knex =>
  knex('users')
    .truncate()
    .then(() =>
      knex('users').insert([
        {
          id: 1,
          name: 'Tom',
          email: 'tom@lambdaschool.com',
          username: 'tom',
          password:
            '$2a$04$CZFMXfya3axlqzSwYulma.XhyYbNR05oYYh05iWwxDDKft7Ro9EsC',
          balance: 1000
        },
        {
          id: 2,
          name: 'Tommy',
          email: 'tommy@lambdaschool.com',
          username: 'tommy',
          password:
            '$2a$04$a0PiX7jDoYR5wc5v.ck9guU6NbfNSyGjAtYpQYJY68.pWXTn1XNeq',
          balance: 214.25
        },
        {
          id: 3,
          name: 'Samuel',
          email: 'samuel@lambdaschool.com',
          username: 'samuel',
          password:
            '$2a$04$77DunET/R7H2MsZBe6Z99OrCyjc5I1zans6TgYvZnoGCnabXHwHFG',
          balance: 3500000
        },
        {
          id: 4,
          name: 'David',
          email: 'david@lambdaschool.com',
          username: 'david',
          password:
            '$2a$04$ryAsUZtH01uFQuqhBH0bzur6rM5D0FnN49nxzkMuRyOsxrJgz/DyS',
          balance: 16
        }
      ])
    )
