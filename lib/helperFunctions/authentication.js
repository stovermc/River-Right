const server = require('../../server')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const config = dotenv.config().parsed

checkHasToken = (req, res, next) => {
  const token = req.body.token ||
                req.param('token') ||
                req.headers['authorization'];

  if (token === undefined) {
    return res.status(403).send({
      success: false,
      message: "No token provided"
    })
  }
  next()
}

checkAuth = (req, res, next) => {
  const token = req.body.token ||
                req.param('token') ||
                req.headers['authorization'];

  jwt.verify(token, config.CLIENT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).send({
          success: false,
          secret: config.CLIENT_SECRET,
          message: error
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
}

checkPassword = (req, res, next) => {
  User.find(req.body.email)
    .then(data => {
      var pry = require('pryjs'); eval(pry.it);
      const password = req.body.password
      const hashedPassword = data.rows[0].password
      var pry = require('pryjs'); eval(pry.it);
      if (bcrypt.compareSync(req.body.password, data.rows[0].password) === false) {
        res.status(403).send({
          success: false,
          message: 'Invalid Credentials'
        })
      }
    })
  //
  // if (bcrypt.compareSync(req.body.password, user.password) == false) {
  //   res.status(403).send({
  //   success: false,
  //   message: 'Invalid Credentials'
  //   })
  // }
}

signToken = (req, res, next) => {
  const userId = User.find(req.body.email)
    const token = jwt.sign(userId, config.CLIENT_SECRET, { expiresIn: 172800 })
    res.json({
      success: true,
      username: user.username,
      token: token
    })
}

module.exports = { checkAuth, checkHasToken, checkPassword, signToken};
