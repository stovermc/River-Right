exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE users_gear_list RESTART IDENTITY')
  .then(function() {
    return knex.raw(
      'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
      [1, 1, new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 2, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 3, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 4, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 5, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 6, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 7, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 8, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 9, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 10, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [1, 11, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [2, 4, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [2, 5, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [3, 6, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [4, 1, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [4, 2, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users_gear_list (user_id, gear_item_id, created_at) VALUES (?, ?, ?)',
        [4, 3, new Date]
      )
    })
  });
};
