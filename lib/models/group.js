const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

class Group {

  static show(id) {
    return db.raw('SELECT * FROM groups WHERE id=?',
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

  static emptyGroupTable() {
    return db.raw('TRUNCATE groups RESTART IDENTITY CASCADE')
  }
}

module.exports = Group
