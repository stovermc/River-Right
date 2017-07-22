
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE users_gear_list(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT,
    gear_item_id INT,
    created_at TIMESTAMP  
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE usersGearList`;
  return knex.raw(dropQuery)
};
