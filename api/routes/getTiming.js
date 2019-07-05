var express = require('express')
var router = express.Router()

const getTimingData = require('../lib/watchTiming')

/* Get timing from unit tests logs */
router.get('/', function(req, res, next) {
  res.send(getTimingData())
})

module.exports = router
