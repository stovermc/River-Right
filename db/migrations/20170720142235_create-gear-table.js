
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE gear_items(
    name TEXT,
    gear_type_id INT,
    created_at TIMESTAMP
    )`;
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE gear_items`
  return knex.raw(dropQuery)
};
