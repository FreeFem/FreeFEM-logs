const express = require('express')
const fs = require('fs')
const router = express.Router()
const cheerio = require('cheerio')

/**
 * @file
 * Get coverage summary
 *
 * Get coverage date and lines and functions coverage
 */
router.get('/', function(req, res, next) {
  const coverageIndex = fs.readFileSync('../coverage/index.html')
  const $ = cheerio.load(coverageIndex.toString())
  
  let coverageDate
  let lineCoverage, functionCoverage
  
  const headerItems = $('td.headerItem')
  headerItems.each(function(i, elem) {
    if ($(this).text().trim() === 'Lines:')
      lineCoverage = $(this).parent().children().eq(-1).text()
    if ($(this).text().trim() === 'Functions:') {
      functionCoverage = $(this).parent().children().eq(-1).text()
      coverageDate = $(this).parent().children().eq(1).text()
    }
  })
  
  res.send({
    coverageDate: coverageDate,
    lineCoverage: lineCoverage,
    functionCoverage: functionCoverage
  })
});

module.exports = router
