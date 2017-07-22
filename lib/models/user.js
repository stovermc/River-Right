const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

class User {

  static all() {
    return db.raw('SELECT * FROM users')
  }

  static create(firstName, lastName) {
      return db.raw(`INSERT INTO users (first_name, last_name) VALUES (?, ?) RETURNING id, first_name, last_name`, [firstName, lastName])
  }

  static emptyUsersTable() {
    return db.raw('TRUNCATE users RESTART IDENTITY CASCADE')
  }
}

module.exports = User
