const assert = require('chai').assert
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const db = require('knex')(configuration)
const app = require('../server.js')
const request = require('request')
const GearType = require('../lib/models/gearType')
const User = require('../lib/models/User')
const UsersGearList = require('../lib/models/usersGearList')
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
      .then(function() {
        User.create('Mark', 'Stover')
        .then(function() {
          UsersGearList.create(1, 1)
          .then(function() {
            UsersGearList.create(1, 2)
            .then(function() {
              UsersGearList.create(1, 3)
              .then(function() { done() })
            })
          })
        })
      })
    })
  })
  afterEach(function(done) {
    helper.emptyGearTypesTable()
    .then(function() { done() })
  })

  describe('GearType Endpoints', function() {
    // it('GET /geartypes', function(done) {
    //   this.request.get(`/geartypes`,  function(error, response, body) {
    //     if (error) { done() }
    //
    //     const gearTypes = JSON.parse(body)
    //     assert.equal(response.statusCode, 200)
    //     var pry = require('pryjs'); eval(pry.it);
    //     assert.equal(gearTypes[0].category, 'Kitchen')
    //     assert.equal(gearTypes[1].category, 'Raft Rig')
    //     done()
    //   })
    // })

    it('GET /geartypes', function(done) {
      const userId = 1
      const gearTypeId = 1
      this.request.get(`/geartypes/${userId}/${gearTypeId}`, function(error, response, body) {
        if (error) { done() }

        const gearTypes = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        var pry = require('pryjs'); eval(pry.it);
        assert.equal(gearTypes[0].category, 'Kitchen')
        assert.equal(gearTypes[1].category, 'Raft Rig')
        done()
      })
    })
  })
})
