const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const db = require('knex')(configuration)

const emptyUsersTable = () => {
  return db.raw('TRUNCATE users RESTART IDENTITY CASCADE')
}

const emptyGroupTable = () => {
  return db.raw('TRUNCATE groups RESTART IDENTITY CASCADE')
}

const emptyGroupMemberTable = () => {
  return db.raw('TRUNCATE group_members RESTART IDENTITY CASCADE')
}

const emptyUsersGearListTable = () => {
  return db.raw('TRUNCATE users_gear_list RESTART IDENTITY CASCADE')
}


module.exports = { emptyUsersTable,
                   emptyGroupTable,
                   emptyGroupMemberTable,
                   emptyUsersGearListTable
                 }
