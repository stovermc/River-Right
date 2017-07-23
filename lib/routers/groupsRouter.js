const GroupsRouter = require('express').Router()
const GroupsController = require('../controllers/groupsController')

GroupsRouter.get('/:id', (req, res) => {
  GroupsController.show(req, res)
})

GroupsRouter.post('/', (req, res) => {
  GroupsController.create(req, res)
})

GroupsRouter.put('/:id', (req, res) => {
  GroupsController.update(req, res)
})

GroupsRouter.delete('/:id', (req, res) => {
  GroupsController.destroy(req, res)
})

module.exports = GroupsRouter
