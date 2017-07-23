const GroupMembersRouter = require('express').Router()
const GroupMembersController = require('../controllers/groupMembersController')

GroupMembersRouter.post('/', (req, res) => {
  GroupMembersController.create(req, res)
})

module.exports = GroupMembersRouter
