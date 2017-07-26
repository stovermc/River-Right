const GearTypesRouter = require('express').Router()
const GearTypesController = require('../controllers/GearTypesController')

GearTypesRouter.get('/', (req, res) => {
  GearTypesController.index(req, res)
})

GearTypesRouter.get('/:userId/:gearTypeId', (req, res) => {
  GearTypesController.show(req, res)
})

module.exports = GearTypesRouter
