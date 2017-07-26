const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)
const bcrypt = require('bcrypt')
const saltRounds = 10

class User {

  static all() {
    return db.raw('SELECT * FROM users')
  }

  static show(id) {
    return db.raw('SELECT * FROM users WHERE id=?',
      [id])
  }

  static find(email) {
    return db.raw('SELECT * FROM users WHERE email=?',
      [email])
  }

  static update(params, id) {
    if (params.first_name && params.last_name) {
      return db.raw('UPDATE users SET first_name=?, last_name=? WHERE id=? RETURNING *',
        [params.first_name, params.last_name, id])

    } else if (params.first_name) {
      return db.raw('UPDATE users SET first_name=? WHERE id=? RETURNING *',
        [params.first_name, id])

    } else if (params.last_name){
      return db.raw('UPDATE users SET last_name=? WHERE id=? RETURNING *',
        [params.last_name, id])
    }
  }

  static create(firstName, lastName, email, password) {
    var pry = require('pryjs'); eval(pry.it)
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
      return db.raw(`INSERT INTO users (first_name, last_name, email, password created_at)
                    VALUES (?, ?, ?) RETURNING id, first_name, last_name`,
                    [firstName, lastName, email, hashedPassword, new Date])
  }

  static destroy(id) {
    return db.raw('DELETE FROM users WHERE id=? RETURNING *',
      [id])
  }
}


module.exports = User
