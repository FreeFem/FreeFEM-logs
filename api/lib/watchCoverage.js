const fs = require('fs')
var parse = require('lcov-parse')

const COVERAGE_FILE = '../coverage/report.info'
let coverageData = {}

function getDirectory(path) {
	var elts = path.split('/')
	return elts[elts.length-3]+'/'+elts[elts.length-2]
}

function getFileName(path) {
	var elts = path.split('/')
	return elts[elts.length-1]
}

function coveragePrecision(x) {
	if (!x)
		return 0
  return Number.parseFloat(x).toFixed(1)
}

function computeCoverage(obj) {
	obj.linesCovered = coveragePrecision(obj.nbLinesHit/obj.nbLines * 100)
	obj.functionsCovered = coveragePrecision(obj.nbFunctionsHit/obj.nbFunctions * 100)
}

function loadCoverage () {
  console.log('loading coverage...')

  parse(COVERAGE_FILE, function(err, data) {
		if (err) throw err

		var covInfo = {
			nbLinesHit: 0,
			nbLines: 0,
			linesCovered: 0,

			nbFunctionsHit: 0,
			nbFunctions: 0,
			functionsCovered: 0,

			directories: {}
		}

		// Add directories
		data.map(fileInfo => {
			covInfo.directories[getDirectory(fileInfo.file)] = {
				nbLinesHit: 0,
				nbLines: 0,
				linesCovered: 0,

				nbFunctionsHit: 0,
				nbFunctions: 0,
				functionsCovered: 0,

				files: {}
			}
		})

		// Add file structure
		data.map(fileInfo => {
			covInfo.directories[getDirectory(fileInfo.file)].files[getFileName(fileInfo.file)] = {
				nbLinesHit: 0,
				nbLines: 0,
				linesCovered: 0,

				nbFunctionsHit: 0,
				nbFunctions: 0,
				functionsCovered: 0
			}
		})

		// Retrieve info
		data.map(fileInfo => {
			covInfo.nbLinesHit += fileInfo.lines.hit
			covInfo.nbLines += fileInfo.lines.found
			covInfo.nbFunctionsHit += fileInfo.functions.hit
			covInfo.nbFunctions += fileInfo.functions.found

			directory = covInfo.directories[getDirectory(fileInfo.file)]
			directory.nbLinesHit += fileInfo.lines.hit
			directory.nbLines += fileInfo.lines.found
			directory.nbFunctionsHit += fileInfo.functions.hit
			directory.nbFunctions += fileInfo.functions.found

			file = directory.files[getFileName(fileInfo.file)]
			file.nbLinesHit += fileInfo.lines.hit
			file.nbLines += fileInfo.lines.found
			file.nbFunctionsHit += fileInfo.functions.hit
			file.nbFunctions += fileInfo.functions.found

			computeCoverage(directory)
			computeCoverage(file)
		})

		computeCoverage(covInfo)

		coverageData = covInfo
    console.log('coverage loaded!')
	})
}

// Load coverage at startup & reload on file modifications
loadCoverage()
fs.watchFile(COVERAGE_FILE, curr => {
  loadCoverage()
})

function getCoverageData() {
  return coverageData
}

module.exports = getCoverageData
