const User = require('../models/user')

class UsersController {

  static create(req, res) {
    User.create(req.body.first_name, req.body.last_name)
      .then(data => {
        res.json(data.rows[0])
      })
  }

  static index(req, res) {
    User.all()
      .then(data => {
        res.json(data.rows)
      })
  }

  static show(req, res) {
    User.show(req.params.id)
      .then(data => {
        res.json(data.rows[0])
      })
  }
}

module.exports = UsersController
