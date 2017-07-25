const GearType = require('../models/gearType')

class GearTypesController {

  static index(req, res) {
    GearType.index(req, res)
    .then(data => {
      res.json(data.rows)
    })
  }

  static show(req, res) {
    GearType.show(req.params, res)
    .then(data => {
      res.json(data.rows)
    })
  }
}

module.exports = GearTypesController
