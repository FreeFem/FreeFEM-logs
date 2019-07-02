var express = require('express')
var router = express.Router()

const fs = require('fs')

//const getSourceCode = require('../lib/watchSourceCode')

const COVERAGE_DIRECTORY = '../coverage/'

/* Get source code */
router.post('/', function(req, res, next) {
  console.log('get source code from: '+COVERAGE_DIRECTORY+req.body.path)
  let sourceCodeFile = fs.readFileSync(COVERAGE_DIRECTORY+req.body.path)
  res.send(sourceCodeFile.toString())
  //res.sendFile(COVERAGE_DIRECTORY+req.body.path)
})

module.exports = router
