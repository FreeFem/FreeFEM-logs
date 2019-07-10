var express = require('express')
var router = express.Router()

const getUnitLogs = require('../lib/watchUnitLogs')

/* Get unit tests logs */
router.get('/', function(req, res, next) {
  res.send(getUnitLogs())
})

module.exports = router
