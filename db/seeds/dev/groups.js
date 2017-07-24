exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE groups RESTART IDENTITY')
  .then(function() {
    return knex.raw(
      'INSERT INTO groups (name, created_at) VALUES (?, ?)',
      ['Middle Fork of the Salmon', new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO groups (name, created_at) VALUES (?, ?)',
        ['Grand Canyon', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO groups (name, created_at) VALUES (?, ?)',
        ['Lochsa', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO groups (name, created_at) VALUES (?, ?)',
        ['Deschutes', new Date]
      )
    })
  });
};
