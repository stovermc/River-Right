const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

class GroupMember {

  static create(user_id, group_id) {
    return db.raw(`INSERT INTO group_members (user_id, group_id, created_at) VALUES(?, ?, ?) RETURNING *`,
      [user_id, group_id, new Date])
  }

  static destroy(id) {
    return db.raw('DELETE FROM group_members WHERE id=? RETURNING *',
      [id])
  }

  static emptyGroupMemberTable() {
    return db.raw('TRUNCATE group_members RESTART IDENTITY CASCADE')
  }


}

module.exports = GroupMember
