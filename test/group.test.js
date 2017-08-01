const assert = require('chai').assert
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const db = require('knex')(configuration)
const app = require('../server.js')
const request = require('request')
const Group = require('../lib/models/group')
const GroupMember = require('../lib/models/groupMember')
const User = require('../lib/models/user')
const helper = require('./helpers/emptyTables')

describe('Server connection', function() {
  this.timeout(100000)
  before(function(done) {
    this.port = 9876
    this.server = app.app.listen(this.port, function(error, result) {
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
    Group.create('Middle Fork of the Salmon')
    .then(function() {
      Group.create('Grand Canyon')
      .then(function() {
        Group.create('Lochsa')
        .then(function() { done () })
      })
    })
  })

  afterEach(function(done) {
    helper.emptyGroupTable()
    .then(function() {
      helper.emptyUsersTable()
      .then(function() {
        helper.emptyGroupMemberTable()
        .then(function() { done() })
      })
    })
  })


  describe('Group endpoints', function() {
    it('POST /groups', function(done) {
      const newGroup = { name: 'Deschutes'}
      this.request.post('/groups', { form: newGroup }, function(error, response, body) {
        if (error) { done() }

        const group = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(group.id, 4)
        assert.equal(group.name, newGroup.name)
        done()
      })
    })

    it('PUT /groups/:id', function(done) {
      const newGroup = { name: 'Lower Salmon'}
      this.request.put('/groups/1', { form: newGroup }, function(error, response, body) {
        if (error) { done() }

        const group = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(group.id, 1)
        assert.equal(group.name, 'Lower Salmon')
        done()
      })
    })

    it('DELETE /groups/:id', function(done) {
      this.request.delete('/groups/1', function(error, response, body) {
        if(error) { done() }

        const group = JSON.parse(body)
        assert.equal(response.statusCode, 200)
        assert.equal(group.name, 'Middle Fork of the Salmon')
        assert.equal(group.status, false)
        done()
      })
    })

    it('shows all users in a single group', function(done) {
      const groupID = 1
      const myRequest = this.request
      User.create('Mark', 'Stover', 'guest@gmail.com', 'password')
      .then(function() {
        User.create('Lexi', 'Brumder', 'lexi@gmail.com', 'password')
        .then(function() {
          User.create('Scotty', 'Harry', 'scotty@gmail.com', 'password')
          .then(function() {
            User.create('Alex', 'Riffle', 'alex@gmail.com', 'password')
            .then(function() {
              GroupMember.create(1, groupID)
              .then(function() {
                GroupMember.create(2, groupID)
                .then(function() {
                  GroupMember.create(3, groupID)
                  .then(function() {
                    GroupMember.create(3, 2)
                    .then(function() {

                      myRequest.get(`/groups/${groupID}`, function(error, response, body) {
                        if(error) { done() }

                        const groupMembers = JSON.parse(body)
                        assert.equal(response.statusCode, 200)
                        assert.equal(groupMembers.length, 3)
                        // assert.equal(groupMembers[1].first_name, 'Lexi' )
                        // assert.equal(groupMembers[3].first_name, 'Scotty')
                        done()
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
