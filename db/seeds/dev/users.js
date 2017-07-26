exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE users RESTART IDENTITY')
  .then(function() {
    return knex.raw(
      'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
      ['Mark', 'Stover', 'stovermc@gmail.com', 'password', new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
        ['Lexi','Brumder', 'lexi@gmail.com', 'password', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
        ['Alex', 'Riffle', 'alex@gmail.com', 'password',new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
        ['Scotty', 'Harry', 'scotty@gmail.com', 'password', new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
        ['Ellis', 'Bennett', 'ellis@gmail.com', 'password', new Date]
      )
    })
  });
};
