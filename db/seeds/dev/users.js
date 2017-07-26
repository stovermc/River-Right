const bcrypt = require('bcrypt')

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE users RESTART IDENTITY')
  .then(function() {
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync('password', saltRounds);

    return knex.raw(
      'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
      ['Mark', 'Stover', 'stovermc@gmail.com', hashedPassword, new Date]
    ).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
        ['Lexi','Brumder', 'lexi@gmail.com', hashedPassword, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
        ['Alex', 'Riffle', 'alex@gmail.com', hashedPassword,new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
        ['Scotty', 'Harry', 'scotty@gmail.com', hashedPassword, new Date]
      )
    }).then(function(){
      return knex.raw(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
        ['Ellis', 'Bennett', 'ellis@gmail.com', hashedPassword, new Date]
      )
    })
  });
};
