const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

class UsersGearList {

  static index(userId) {
    return db.raw(`SELECT gear_items.name
                   FROM gear_items
                   INNER JOIN users_gear_list
                   ON gear_items.id = users_gear_list.gear_item_id
                   WHERE users_gear_list.user_id = ?`,
                    [userId])
  }

  static create(user_id, gear_item_id) {
    return db.raw(`INSERT INTO users_gear_list (user_id, gear_item_id, created_at)
                   VALUES(?, ?, ?) RETURNING id, user_id, gear_item_id`,
                    [user_id, gear_item_id, new Date])
  }

  static destroy(id) {
    return db.raw('DELETE FROM users_gear_list WHERE id=? RETURNING *',
      [id])
  }
}

module.exports = UsersGearList
