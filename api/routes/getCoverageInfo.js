var express = require('express')
var router = express.Router()

const getCoverageData = require('../lib/watchCoverage')

/* Get coverage info */
//TODO why no call getCoverage ?
router.get('/', function(req, res, next) {
  res.send(getCoverageData())
})

module.exports = router
