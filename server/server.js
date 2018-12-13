const express = require('express')

const configureMiddleware = require('./config/middleware.js')
const {
  register,
  login,
  verifySession,
  getHomepage,
  getUsers,
  getFriends,
  postBill,
  getBillById,
  payBillById,
  getBills,
  addFriend
} = require('./controllers')

const server = express()

configureMiddleware(server)

// public routes
server.post('/register', register)
server.post('/login', login)
// no logout route because with JWTs that is handled clientside

// protected routes
server.get('/', verifySession, getHomepage) // response includes user balance and unsettled bills

server.get('/users', verifySession, getUsers) // to search for friends
server.get('/friends', verifySession, getFriends) // so that the user knows who they can add to bills
server.post('/friends/:id', verifySession, addFriend) // to add friend that has the passed id

server.post('/bill', verifySession, postBill) // bill info in request body
server.get('/bill/:id', verifySession, getBillById) // get info for a single bill
server.put('/bill/:id/pay', verifySession, payBillById) // move "money" from one user to another

// note the extra s here
server.get('/bills', verifySession, getBills) // return all bills associated with user, sorted by recency

// export server
module.exports = server
