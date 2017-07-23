const GroupMember = require('../models/groupMember')

class GroupMembersController {

  static create(req, res) {
    GroupMember.create(req.body.user_id, req.body.group_id)
      .then(data =>{
        res.json(data.rows[0])
      })
  }
}

module.exports = GroupMembersController
