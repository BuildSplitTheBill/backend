const register = require('./register.js')
const login = require('./login.js')
const logout = require('./logout.js')
const verifySession = require('./verifySession.js')
const getHomepage = require('./getHomepage.js')
const getUsers = require('./getUsers.js')
const getFriends = require('./getFriends.js')
const postBill = require('./postBill.js')
const getBillById = require('./getBillById.js')
const payBillById = require('./payBillById.js')
const editBillById = require('./editBillById.js')
const deleteBillById = require('./deleteBillById.js')
const getBills = require('./getBills.js')

module.exports = {
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
}
