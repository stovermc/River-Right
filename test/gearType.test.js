const assert = require('chai').assert
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const db = require('knex')(configuration)
const app = require('../server.js')
const request = require('request')
const GearType = require('../lib/models/gearType')
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
    helper.createGearType('Kitchen')
      .then(function() {
        helper.createGearType('Raft Rig')
          .then(function() { done() })
      })
  })
  afterEach(function(done) {
    helper.emptyGearTypesTable()
    .then(function() { done() })
  })

  describe('GearType Endpoints', function() {
    it('GET /geartypes', function(done) {
      this.request.get('/geartypes', function(error, response, body) {
        if (error) { done() }

        const gearTypes = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(gearTypes[0].category, 'Kitchen')
        assert.equal(gearTypes[1].category, 'Raft Rig')
        done()
      })
    })
  })
})
