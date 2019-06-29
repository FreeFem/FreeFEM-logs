const fs = require('fs')
var parse = require('lcov-parse')

const COVERAGE_FILE = '../coverage/report.info'
let coverageData = {}

String.prototype.nthIndexOf = function(pattern, n) {
	var i = -1
	while (n-- && i++ < this.length) {
		i = this.indexOf(pattern, i)
		if (i < 0) break
	}
	return i
}

function getDirectory(path) {
	var nbOfDashes = (path.match(/\//g) || []).length
	var start = path.nthIndexOf('/', nbOfDashes-2)
	var end = path.lastIndexOf('/')
	return path.substring(start, end)
}

function getFileName(path) {
	var end = path.lastIndexOf('/') + 1
	return path.substring(end)
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

  parse('../coverage/report.info', function(err, data) {
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
