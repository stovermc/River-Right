exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE gear_type RESTART IDENTITY')
  .then(function() {
    return knex.raw(
      'INSERT INTO gear_type (category, created_at) VALUES (?, ?)',
      ['Raft Rig', new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO gear_type (category, created_at) VALUES (?, ?)',
        ['Kitchen', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_type (category, created_at) VALUES (?, ?)',
        ['Bathroom', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO gear_type (category, created_at) VALUES (?, ?)',
        ['Fire', new Date]
      )
    })
  });
};
