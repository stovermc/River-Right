exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE group_members RESTART IDENTITY')
  .then(function() {
    return knex.raw(
      'INSERT INTO group_members (user_id, group_id, created_at) VALUES (?, ?, ?)',
      [1, 1, new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO group_members (user_id, group_id, created_at) VALUES (?, ?, ?)',
        [2, 1, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO group_members (user_id, group_id, created_at) VALUES (?, ?, ?)',
        [3, 2, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO group_members (user_id, group_id, created_at) VALUES (?, ?, ?)',
        [4, 1, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO group_members (user_id, group_id, created_at) VALUES (?, ?, ?)',
        [5, 1, new Date]
      )
    })
  });
};
