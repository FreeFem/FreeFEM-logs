var express = require('express')
var router = express.Router()

const fs = require('fs')

const COVERAGE_DIRECTORY = '../coverage/'

/* Get source code */
router.post('/', function(req, res, next) {
  let sourceCodeFile = fs.readFileSync(COVERAGE_DIRECTORY + req.body.path)
  res.send(sourceCodeFile)
})

module.exports = router
