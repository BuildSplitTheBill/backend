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
  editBillById,
  deleteBillById,
  getBills
} = require('./controllers')

const server = express()

configureMiddleware(server)

// sanity check
server.get('/sanity-check', (req, res) => {
  res.status(200).json({ api: 'running' })
})

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
server.put('/bill/:id/edit', verifySession, editBillById) // if nothing paid yet, edit bill
server.delete('/bill/:id', verifySession, deleteBillById) // if nothing paid yet, delete bill

server.get('/bills', verifySession, getBills) // return all bills associated with user, sorted by recency

// export server
module.exports = server
