const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000
const UsersRouter = require('./lib/routers/usersRouter')
const GroupsRouter = require('./lib/routers/groupsRouter')
app.locals.title = 'River Right'
app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', port)
app.listen(port, function() {
  console.log(`Listening in port ${port}`)
})
app.use('/api/v1/users', UsersRouter)
app.use('/api/v1/groups', GroupsRouter)

// app.post('/login',
//   passport.authenticate('local'),
//   (req, res) => {
//     res.redirect('api/v1/users', UsersRouter)
//   })

module.exports = app
