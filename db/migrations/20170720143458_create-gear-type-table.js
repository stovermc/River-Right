
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE gear_type(
    id SERIAL PRIMARY KEY NOT NULL,
    category TEXT,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE gearType`;
  return knex.raw(dropQuery);
};
