const express = require('express')

const configureMiddleware = require('./config/middleware.js')
const {
  register,
  login,
  logout,
  verifySession,
  getHomepage,
  getUsers,
  getFriends,
  postBill,
  getBillById,
  payBillById,
  getBills
} = require('./controllers')

const server = express()

configureMiddleware(server)

// public routes
server.post('/register', register)
server.post('/login', login)
server.post('/logout', logout)

// protected routes
server.get('/', verifySession, getHomepage) // response includes user balance and unsettled bills

server.get('/users', verifySession, getUsers) // to search for friends
server.get('/friends', verifySession, getFriends) // so that the user knows who they can add to bills

server.post('/bill', verifySession, postBill) // bill info in request body
server.get('/bill/:id', verifySession, getBillById) // get info for a single bill
server.put('/bill/:id/pay', verifySession, payBillById) // move "money" from one user to another

server.get('/bills', verifySession, getBills) // return all bills associated with user, sorted by recency

// export server
module.exports = server
