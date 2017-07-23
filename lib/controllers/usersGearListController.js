const UsersGearList = require('../models/usersGearList')

class UsersGearListController {

  static create(req, res) {
    UsersGearList.create(req.body.user_id, req.body.gear_item_id)
    .then(data => {
      res.json(data.rows[0])
    })
  }
}

module.exports = UsersGearListController
