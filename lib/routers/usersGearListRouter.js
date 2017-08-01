const UsersGearListRouter = require('express').Router()
const UsersGearListController = require('../controllers/usersGearListController')

UsersGearListRouter.get('/:id', (req, res) => {
  UsersGearListController.index(req, res)
})

UsersGearListRouter.post('/', (req, res) => {
  UsersGearListController.create(req, res)
})

UsersGearListRouter.delete('/:id', (req, res) => {
  UsersGearListController.delete(req, res)
})

module.exports = UsersGearListRouter
