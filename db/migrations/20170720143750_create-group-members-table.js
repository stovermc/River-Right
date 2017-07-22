
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE group_members(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT,
    group_id INT,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE groupMembers`;
  return knex.raw(dropQuery);
};
