const express = require('express')

const configureMiddleware = require('./config/middleware.js')

const server = express()

configureMiddleware(server)

// sanity check
server.get('/sanity-check', (req, res) => {
  res.status(200).json({ api: 'running' })
})

// public routes

server.post('/register')
server.post('/login')
server.post('/logout')

// protected routes

server.get('/') // response includes user balance and unsettled bills

server.get('/users') // to search for friends
server.get('/friends') // so that the user knows who they can add to bills

server.post('/bills') // bill info in request body
server.get('/bills/:id') // get info for a single bill
server.put('/bills/:id/pay') // move "money" from one user to another
server.put('/bills/:id/edit') // if nothing paid yet, edit bill
server.delete('/bills/:id') // if nothing paid yet, delete bill

server.get('/bills') // return all bills associated with user, sorted by recency
server.get('/bills/active') // return only current bills
server.get('/bills/archived') // return history of bills

// export server
module.exports = server
