const Group = require('../models/group')

class GroupController {

  static show(req, res) {
    Group.show(req.params.id)
      .then(data => {
        res.json(data.rows[0])
      })
  }

  static create(req, res) {
    Group.create(req.body.name)
      .then(data => {
        res.json(data.rows[0])
      })
  }
}

module.exports = GroupController
