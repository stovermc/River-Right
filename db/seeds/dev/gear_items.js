exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE gear_items RESTART IDENTITY')
  .then(function() {
    return knex.raw(
      'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
      ['Raft', 1, new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Frame', 1, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Dry Box', 1, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Cooler', 1, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Oars', 1, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Stove', 2, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Blaster', 2, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Propane Tank', 2, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Groover', 3, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Groover Seat', 3, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_items (name, gear_type_id, created_at) VALUES (?, ?, ?)',
        ['Fire Pan', 4, new Date]
      )
    })
  });
};
