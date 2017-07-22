
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE groups(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery =   `DROP TABLE groups`;
  return knex.raw(dropQuery);
};
