const fs = require('fs')
const path = require('path')
const UNIT_DIRECTORY = '../unit'

let unitLogs = {}

function loadUnitLogs () {
  console.log('loading unit logs...')

	if (!fs.existsSync(UNIT_DIRECTORY))
    return

	unitLogs = {
		validUnitTests: 0,
		totalUnitTests: 0,
		failedTests: [],
		logFiles: [],
		logFilesContent: []
	}

	let directories = []
	let logFiles = []

	let dirPath = UNIT_DIRECTORY

	do {
		var dirOrFiles = []
		var dirContent = fs.readdirSync(dirPath)
		dirContent.forEach(elt => {
			dirOrFiles.push(dirPath+'/'+elt)
		})

		// get .log files
		dirOrFiles.filter(elt => path.extname(elt) === '.log').forEach(file => logFiles.push(file))
		// get directories
		dirOrFiles.filter(elt => fs.lstatSync(elt).isDirectory()).forEach(dir => directories.push(dir))
		
		dirPath = directories.shift();
	} while (directories.length > 0)
	
	unitLogs.totalUnitTests = logFiles.length
	unitLogs.logFiles = logFiles
  
  for (var f = 0; f < logFiles.length; f++) {
		let filaPath = logFiles[f]
		let fileContent = fs.readFileSync(filaPath, 'utf-8')

		unitLogs.logFilesContent.push(fileContent)

		if (fileContent.search('Ok: Normal End') !== -1)
			unitLogs.validUnitTests++
		else {
			var fileName = logFiles[f].split('/').pop().split('.')[0]
			unitLogs.failedTests.push(fileName)
		}
	}

  console.log('unit logs loaded!')
}

// Load unit logs at startup
loadUnitLogs()

function getUnitLogs() {
  return unitLogs
}

module.exports = getUnitLogs
