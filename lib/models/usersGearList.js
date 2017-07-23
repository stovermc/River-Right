const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

class UsersGearList {

  static create(user_id, gear_item_id) {
    return db.raw(`INSERT INTO users_gear_list (user_id, gear_item_id, created_at)
                   VALUES(?, ?, ?) RETURNING id, user_id, gear_item_id`,
                    [user_id, gear_item_id, new Date])
  }
}

module.exports = UsersGearList
