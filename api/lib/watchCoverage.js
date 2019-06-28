const fs = require('fs')

function loadCoverage () {
  console.log('loading')
}

fs.watchFile('../coverage/report.info', curr => {
  loadCoverage()
})

const coverageData = {truc: 'bidule'}

module.exports = coverageData