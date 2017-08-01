const UsersGearList = require('../models/usersGearList')

class UsersGearListController {

  static index(req, res) {
    UsersGearList.index(req.params.id)
    .then(data => {
      res.json(data.rows)
    })
  }

  static create(req, res) {
    UsersGearList.create(req.body.user_id, req.body.gear_item_id)
    .then(data => {
      res.json(data.rows[0])
    })
  }

  static delete(req, res) {
    UsersGearList.destroy(req.params.id)
    .then(data => {
      res.json(data.rows[0])
    })
  }
}

module.exports = UsersGearListController
