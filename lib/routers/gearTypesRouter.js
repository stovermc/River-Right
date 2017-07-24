const GearTypesRouter = require('express').Router()
const GearTypesController = require('../controllers/GearTypesController')

GearTypesRouter.get('/', (req, res) => {
  GearTypesController.index(req, res)
})

module.exports = GearTypesRouter
