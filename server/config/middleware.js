const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const db = require('../../database/dbConfig.js')

module.exports = server => {
  server.use(express.json())
  server.use(helmet())
  server.use(morgan('dev'))
  server.use(cors())

  // sessions setup
  server.use(
    session({
      name: 'raaaar',
      secret: 'Colorless green ideas sleep furiously',
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false
      },
      httpOnly: true,
      resave: false,
      saveUninitialized: false,
      store: new KnexSessionStore({
        tablename: 'sessions',
        sidfieldname: 'sid',
        knex: db,
        createtable: true,
        clearInterval: 24 * 60 * 60 * 1000
      })
    })
  )
}
