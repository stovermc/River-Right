const GroupRouter = require('express').Router()
const GroupController = require('../controllers/groupsController')

GroupRouter.get('/:id', (req, res) => {
  GroupController.show(req, res)
})

module.exports = GroupRouter
