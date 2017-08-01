const server = require('../../server')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const config = dotenv.config().parsed

checkHasToken = (req, res, next) => {
  const token = req.body.token ||
                // req.param('token') ||
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
    const password = req.body.password
    const hashedPassword = data[0].password
    if (bcrypt.compareSync(req.body.password, hashedPassword) === false) {
      res.status(403).send({
        success: false,
        message: 'Invalid Credentials'
      })
    }
  })
  next()
}

signToken = (req, res, next) => {
  User.find(req.body.email)
  .then(data => {
    const userInfo = {
                      id: data[0].id,
                      firstName: data[0].first_name,
                      lastName: data[0].last_name
                    }
    const token = jwt.sign(userInfo, config.CLIENT_SECRET, { expiresIn: 172800 })
    res.json({
    success: true,
    firstName: userInfo.firstName,
    token: token
    })
  })
}

module.exports = { checkAuth, checkHasToken, checkPassword, signToken};
