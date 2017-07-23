const GroupMembersRouter = require('express').Router()
const GroupMembersController = require('../controllers/groupMembersController')

GroupMembersRouter.post('/', (req, res) => {
  GroupMembersController.create(req, res)
})

GroupMembersRouter.delete('/:id', (req, res) => {
  GroupMembersController.delete(req, res)
})

module.exports = GroupMembersRouter
