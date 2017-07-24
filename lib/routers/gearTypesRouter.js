const GearTypesRouter = require('express').Router()
const GearTypesController = require('../controllers/GearTypesController')

GearTypesRouter.get('/', (req, res) => {
  GearTypesController.get(req, res)
})
