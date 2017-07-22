const assert = require('chai').assert
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const db = require('knex')(configuration)
const app = require('../server.js')
const request = require('request')
const Group = require('../lib/models/user')

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
    Group.create('Middle Fork of the salmon')
    .then(function() {
      Group.create('Grand Canyon')
      .then(function() {
        Group.create('Lochsa')
          .then(function() { done () })
      })
    })
  })

  afterEach(function(done) {
    Group.emptyGroupTable()
    .then(function() { done() })
  })

  describe('Group endpoints', function() {
    it('GET /groups', function(done) {
      this.request.get('/groups', function(error, response, body) {
        if (error) { done(error) }

        const groups = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        var pry = require('pryjs'); eval(pry.it);
      })
      done()
    })
  })
})
