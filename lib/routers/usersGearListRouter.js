const UsersGearListRouter = require('express').Router()
const UsersGearListController = require('../controllers/usersGearListController')

UsersGearListRouter.post('/', (req, res) => {
  UsersGearListController.create(req, res)
})

module.exports = UsersGearListRouter
