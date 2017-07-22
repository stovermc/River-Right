const GroupRouter = require('express').Router()
const GroupController = require('../controllers/groupsController')

GroupRouter.get('/:id', (req, res) => {
  GroupController.show(req, res)
})

GroupRouter.post('/', (req, res) => {
  GroupController.create(req, res)
})

GroupRouter.put('/:id', (req, res) => {
  GroupController.update(req, res)
})

module.exports = GroupRouter
