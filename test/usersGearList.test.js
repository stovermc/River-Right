const assert = require('chai').assert
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const db = require('knex')(configuration)
const app = require('../server.js')
const request = require('request')
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
    UsersGearList.create(1, 2)
      .then(function() {
        UsersGearList.create(2, 2)
          .then(function() { done() })
      })
  })
  afterEach(function(done) {
    helper.emptyUsersGearListTable()
    .then(function() { done() })
  })

  describe('UsersGearList Endpoints', function() {
    it('POST /usersgearlist', function(done) {
      const newItem = { user_id: 1, gear_item_id: 3}
      this.request.post('/usersgearlist', { form: newItem }, function(error, response, body) {
        if (error) { done() }

        const addedItem = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(addedItem.user_id, 1)
        assert.equal(addedItem.gear_item_id, 3)
        done()
      })
    })
  })
})
