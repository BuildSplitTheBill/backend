const register = require('./register.js')
const login = require('./login.js')
const verifySession = require('./verifySession.js')
const getHomepage = require('./getHomepage.js')
const getUsers = require('./getUsers.js')
const getFriends = require('./getFriends.js')
const postBill = require('./postBill.js')
const getBillById = require('./getBillById.js')
const payBillById = require('./payBillById.js')
const getBills = require('./getBills.js')
const addFriend = require('./addFriend.js')

module.exports = {
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
}
