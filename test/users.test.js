const assert = require('chai').assert
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const db = require('knex')(configuration)
const app = require('../server.js')
const request = require('request')
const User = require('../lib/models/user')
process.env.NODE_ENV = 'test'
// const user = new User

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
    User.emptyUsersTable()
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
  })
})
