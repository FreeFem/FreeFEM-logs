const fs = require('fs')
var parse = require('lcov-parse')

const COVERAGE_FILE = '../coverage/report.info.out'
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

	if (!fs.existsSync(COVERAGE_FILE))
		return

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

		var fileStats = fs.statSync(COVERAGE_FILE)
		covInfo['date'] = fileStats.mtime.toUTCString()

		// Build directories
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

		// Build files
		data.map(fileInfo => {
			covInfo.directories[getDirectory(fileInfo.file)].files[getFileName(fileInfo.file)] = {
				nbLinesHit: 0,
				nbLines: 0,
				linesCovered: 0,

				nbFunctionsHit: 0,
				nbFunctions: 0,
				functionsCovered: 0,

				lines: {},
				functions: {}
			}
		})

		// Retrieve info
		data.map(fileInfo => {

			file = covInfo.directories[getDirectory(fileInfo.file)].files[getFileName(fileInfo.file)]

			fileInfo.lines.details.map(det =>
				{(!file.lines[det.line]) ? (file.lines[det.line] = det.hit) : (file.lines[det.line] += det.hit)})
			fileInfo.functions.details.map(det =>
				{(!file.functions[det.name]) ? (file.functions[det.name] = det.hit) : (file.functions[det.name] += det.hit)})
		})

		Object.values(covInfo.directories).map(directory => {
			Object.values(directory.files).map(file => {
				file.nbLinesHit = Object.values(file.lines).filter(nbHits => nbHits !== 0).length
				file.nbFunctionsHit = Object.values(file.functions).filter(nbHits => nbHits !== 0).length

				file.nbLines = Object.keys(file.lines).length
				file.nbFunctions = Object.keys(file.functions).length

				directory.nbLinesHit += file.nbLinesHit
				directory.nbFunctionsHit += file.nbFunctionsHit

				directory.nbLines += file.nbLines
				directory.nbFunctions += file.nbFunctions

				computeCoverage(file)
			})

			covInfo.nbLinesHit += directory.nbLinesHit
			covInfo.nbFunctionsHit += directory.nbFunctionsHit

			covInfo.nbLines += directory.nbLines
			covInfo.nbFunctions += directory.nbFunctions

			computeCoverage(directory)
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
