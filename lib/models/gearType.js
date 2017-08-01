const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

class GearType {

  static index() {
    return db.raw('SELECT * FROM gear_type')
  }

  static show(params) {
    return db.raw(`
      SELECT gear_items.name
      FROM users
      INNER JOIN users_gear_list ON users.id = users_gear_list.user_id
      INNER JOIN gear_items ON users_gear_list.gear_item_id = gear_items.id
      INNER JOIN gear_type ON gear_items.gear_type_id = gear_type.id
      WHERE gear_type.id=? AND users.id=?`,
        [params.gearTypeId, params.userId]
    )
  }
}

module.exports = GearType
