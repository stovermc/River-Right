exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE users RESTART IDENTITY')
  .then(function() {
    return knex.raw(
      'INSERT INTO users (first_name, last_name,created_at) VALUES (?, ?, ?)',
      ['Mark', 'Stover', new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, created_at) VALUES (?, ?, ?)',
        ['Lexi','Brumder', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, created_at) VALUES (?, ?, ?)',
        ['Alex', 'Riffle', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, created_at) VALUES (?, ?, ?)',
        ['Scotty', 'Harry', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, created_at) VALUES (?, ?, ?)',
        ['Ellis', 'Bennett', new Date]
      )
    })
  });
};
