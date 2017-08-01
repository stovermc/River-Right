/*------------------------------------------------------------------------------
                                 DEPENDENCIES
------------------------------------------------------------------------------*/
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000
const UsersRouter = require('./lib/routers/usersRouter')
const GroupsRouter = require('./lib/routers/groupsRouter')
const GroupMembersRouter = require('./lib/routers/groupMembersRouter')
const UsersGearListRouter = require('./lib/routers/usersGearListRouter')
const GearTypesRouter = require('./lib/routers/gearTypesRouter')
const authenticate = require('./lib/helperFunctions/authentication')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const config = dotenv.config().parsed

/*------------------------------------------------------------------------------
                            EXPRESS CONFIGURATION
------------------------------------------------------------------------------*/

app.locals.title = 'River Right'
app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', port)
app.listen(port, () => {
  console.log(`Listening in port ${port}`)
})
if (!config.CLIENT_SECRET || !config.USERNAME || !config.PASSWORD) {
  throw `Make sure you have a CLIENT_SECRET, USERNAME,
         and PASSWORD in your .env file`
}

/*------------------------------------------------------------------------------
                            AUTHENTICATION
------------------------------------------------------------------------------*/
app.set('secretKey', config.CLIENT_SECRET)

const authenticateUser = [ authenticate.checkPassword, authenticate.signToken]
app.post('/authenticate', authenticateUser)

/*------------------------------------------------------------------------------
                                   ROUTES
------------------------------------------------------------------------------*/

app.get('/', (request, response) => {
  response.send('Welcome to the River Right API!')
})

app.use('/api/v1/users', UsersRouter)
app.use('/api/v1/groups', GroupsRouter)
app.use('/api/v1/groupMembers', GroupMembersRouter)
app.use('/api/v1/usersGearList', UsersGearListRouter)
app.use('/api/v1/geartypes', GearTypesRouter)

module.exports =  app
