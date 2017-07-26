const User = require('../models/user')

class UsersController {

  static create(req, res) {
    User.create(req.body.first_name, req.body.last_name)
      .then(data => {
        res.json(data.rows[0])
        // const tokenContents = {id: data.rows[0].id}
        // const token = jwt.sign(tokenContents, app.get('secretKey'), { expiresIn: 172800 })
        res.json({
          success: true,
          username: user.username,
          token: token
        })
        // res.json({success: true, token: auth.token(data.rows[0])});
      })
  }

  static index(req, res) {
    User.all()
      .then(data => {
        res.json(data.rows)
      })
  }

  static show(req, res) {
    User.show(req.decoded.id)
      .then(data => {
        res.json(data.rows[0])
      })
  }

  static update(req, res) {
    User.update(req.body, req.params.id)
      .then(data => {
        res.json(data.rows[0])
      })
  }

  static destroy(req, res) {
    User.destroy(req.params.id)
      .then(data => {
        res.json(data.rows[0])
      })
  }
}

module.exports = UsersController
