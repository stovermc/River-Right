const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

class GearType {

  static index() {
    return db.raw('SELECT * FROM gear_type')
  }
}

module.exports = GearType
