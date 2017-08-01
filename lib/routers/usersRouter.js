const UsersRouter = require('express').Router()
const UsersController = require('../controllers/usersController')
const authenticate = require('../helperFunctions/authentication')


const requireAuth = [authenticate.checkHasToken, authenticate.checkAuth];

UsersRouter.post('/', UsersController.create);

UsersRouter.get('/', UsersController.index);

UsersRouter.get('/:id', requireAuth, UsersController.show)

UsersRouter.put('/:id', UsersController.update)

UsersRouter.delete('/:id', UsersController.destroy)


// before_action checkAuth

// define wrapper for defining authenticated routes
// function get(path, controllerAction) {
//   UsersRouter.get(path,  someFilter, authenticate.checkHasToken, authenticate.checkAuth, controllerAction)
// }
// get(":/id", UsersController.show);




module.exports = UsersRouter
