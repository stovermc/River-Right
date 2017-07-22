const UsersRouter = require('express').Router()
const UsersController = require('../controllers/usersController')

UsersRouter.post('/', (req, res) => {
  UsersController.create(req, res)
})

UsersRouter.get('/', (req, res) => {
  UsersController.index(req, res)
})

UsersRouter.get('/:id', (req, res) => {
  UsersController.show(req, res)
})

UsersRouter.put('/:id', (req, res) => {
  UsersController.update(req, res)
})

module.exports = UsersRouter
