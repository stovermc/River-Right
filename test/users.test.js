const assert = require('chai').assert
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const db = require('knex')(configuration)
const app = require('../server.js')
const request = require('request')
const User = require('../lib/models/user')
const helper = require('./helpers/emptyTables')

describe('Server connection', function() {
  this.timeout(100000)
  before(function(done) {
    this.port = 9876
    this.server = app.listen(this.port, function(error, result) {
      if (error) { done() }
      done()
    })
    this.request = request.defaults( {
      baseUrl: 'http://localhost:9876/api/v1'
    })
  })

  after(function() {
    this.server.close()
  })

  beforeEach(function(done) {
    User.create('Mark', 'Stover')
    .then(function() {
      User.create('Lexi', 'Brumder')
      .then(function() {
        User.create('Alex', 'Riffle')
        .then(function() {
          User.create('Scotty','Harry')
          .then(function() { done() })

        })
      })
    })
  })
  
  afterEach(function(done) {
    helper.emptyUsersTable()
    .then(function() { done() })
  })

  describe('Users endpoints', function() {
    it('POST /users', function(done) {
      const user = { first_name: 'Alex', last_name: 'Green'}
      this.request.post('/users', { form: user }, function(error, response, body) {
        if (error) { done(error) }

        const user = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(user.first_name, 'Alex')
        assert.equal(user.last_name, 'Green')
        done()
      })
    })

    it('GET /users', function(done) {
      this.request.get('/users', function(error, response, body) {
        if (error) { done(error) }

        const users = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(users.length, 4)
        assert.equal(users[0].first_name, 'Mark')
        assert.equal(users[0].last_name, 'Stover')
        assert.equal(users[3].first_name, 'Scotty')
        assert.equal(users[3].last_name, 'Harry')
        done()
      })
    })

    it('GET /users/:id', function(done) {
      this.request.get('/users/2', function(error,response, body) {
        if (error) { done() }

        const user = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(user.first_name, 'Lexi')
        assert.equal(user.last_name, 'Brumder')
        done()
      })
    })

    it('updates first and last name PUT /users/:id', function(done) {
      const newName = { first_name: 'Alex', last_name: 'Green' }
      this.request.put('/users/1', { form: newName }, function(error, response, body) {
        if (error) { done() }

        const user = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(user.first_name, newName.first_name)
        assert.equal(user.last_name, newName.last_name)
        done()
      })
    })

    it('updates first name only: PUT /users/:id', function(done) {
      const newName = { first_name: 'Alex' }
      this.request.put('/users/1', { form: newName }, function(error, response, body) {
        if (error) { done() }

        const user = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(user.first_name, newName.first_name)
        assert.equal(user.last_name, 'Stover')
        done()
      })
    })

    it('updates last name only: PUT /users/:id', function(done) {
      const newName = { last_name: 'Green' }
      this.request.put('/users/1', { form: newName }, function(error, response, body) {
        if (error) { done() }

        const user = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(user.first_name, 'Mark')
        assert.equal(user.last_name, newName.last_name)
        done()
      })
    })

    it('DELETES /users/:id', function(done) {
      const myRequest = this.request
      myRequest.get('/users', function(error, response, body) {
        if (error) { done() }
        const allUsers = JSON.parse(body)
        assert.equal(allUsers.length, 4)

        myRequest.delete('/users/4', function(error, response, body) {
          if (error) { done() }
          const deletedUser = JSON.parse(body)
          assert.equal(response.statusCode, 200)
          assert.equal(deletedUser.first_name, 'Scotty')
          assert.equal(deletedUser.last_name, 'Harry')

          myRequest.get('/users', function(error, response, body) {
            if (error) { done() }
            const newAllUsers = JSON.parse(body)
            assert.equal(newAllUsers.length, 3)
            done()
          })
        })
      })
    })
  })
})
