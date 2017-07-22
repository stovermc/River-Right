const UsersRouter = require('express').Router()
const UsersController = require('../controllers/UsersController')

UsersRouter.post('/', (req, res) => {
  UsersController.create(req, res)
})

UsersRouter.get('/', (req, res) => {
  UsersController.index(req, res)
})

UsersRouter.get('/:id', (req, res) => {
  UsersController.show(req, res)
})

module.exports = UsersRouter
