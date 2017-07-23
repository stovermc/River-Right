const assert = require('chai').assert
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const db = require('knex')(configuration)
const app = require('../server.js')
const request = require('request')
const GroupMember = require('../lib/models/groupMember')
const User = require('../lib/models/user')
const Group = require('../lib/models/group')

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
    GroupMember.create(1, 2)
      .then(function() {
        GroupMember.create(2, 2)
          .then(function() { done() })
      })
  })
  afterEach(function(done) {
    GroupMember.emptyGroupMemberTable()
    .then(function() { done() })
  })

  describe('Group Member endpoints', function() {
    it('POST /groupmembers', function(done) {
      const groupMember = { user_id: 1, group_id: 1}
      this.request.post('/groupmembers', { form: groupMember }, function(error, response, body) {
        if (error) { done() }

        const groupMember = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(groupMember.user_id, 1)
        assert.equal(groupMember.group_id, 1)
        done()
      })
    })

    it('DELETE /groupmembers', function(done) {
      this.request.delete('/groupmembers/2', function(error, response, body) {
        if (error) { done() }

        const deletedGroupMember = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(deletedGroupMember.user_id, 2)
        assert.equal(deletedGroupMember.group_id, 2)
        done()
      })
    })
  })
})
