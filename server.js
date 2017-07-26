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
app.post('/authenticate', authenticateUser, (req, res) => {
  const user = req.body
    if(user.username !== config.USERNAME || user.password !== config.PASSWORD) {
      res.status(403).send({
      success: false,
      message: 'Invalid Credentials'
    })
  } else {
    const tokenContents = {id: 1}
    const token = jwt.sign(tokenContents, config.CLIENT_SECRET, { expiresIn: 172800 })
    res.json({
      success: true,
      username: user.username,
      token: token
    })
  }
})
//
// const checkAuth = (req, res, next) => {
//   const token = req.body.token ||
//                 req.param('token') ||
//                 req.headers['authorization']
//
//   if (token) {
//     jwt.verify(token, app.get('secretKey'), (error, decoded) => {
//       if (error) {
//         return res.status(403).send({
//           success: false,
//           message: 'Invalid authorization token.'
//         })
//       } else {
//         req.decoded = decoded
//         console.log(req.decoded)
//         next()
//       }
//     })
//   }
//
//   else {
//     return res.status(403).send({
//       success: false,
//       message: 'You must be authorized to hit this endpoint'
//     })
//   }
// }

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

// app.post('/login',
//   passport.authenticate('local'),
//   (req, res) => {
//     res.redirect('api/v1/users', UsersRouter)
//   })

module.exports = { app }
