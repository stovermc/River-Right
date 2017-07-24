const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

class Group {

  static show(id) {
    return db.raw(
      `SELECT users.id, users.first_name, users.last_name, group_members.group_id
       FROM users
       INNER JOIN group_members
       ON users.id = group_members.user_id
       WHERE group_members.group_id = ?`,
        [id])
  }

  static create(name) {
    return db.raw('INSERT INTO groups (name, created_at) VALUES(?, ?) RETURNING id, name, created_at',
      [name, new Date])
  }

  static update(name, id) {
    return db.raw('UPDATE groups SET name=? WHERE id=? RETURNING *',
      [name, id])
  }

  static destroy(id) {
    return db.raw('UPDATE groups SET status=? WHERE id=? RETURNING *',
      [false, id])
  }
}

module.exports = Group
