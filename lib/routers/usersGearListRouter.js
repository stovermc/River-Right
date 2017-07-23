const UsersGearListRouter = require('express').Router()
const UsersGearListController = require('../controllers/usersGearListController')

UsersGearListRouter.post('/', (req, res) => {
  UsersGearListController.create(req, res)
})

UsersGearListRouter.delete('/:id', (req, res) => {
  UsersGearListController.delete(req, res)
})

module.exports = UsersGearListRouter
