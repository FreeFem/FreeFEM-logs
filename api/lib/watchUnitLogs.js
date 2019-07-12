const fs = require('fs')
const path = require('path')
const UNIT_DIRECTORY = '../unit'

let unitLogs = {}

function loadUnitLogs () {
  console.log('loading unit logs...')

	if (!fs.existsSync(UNIT_DIRECTORY))
    return

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

	let totalUnitTests = logFiles.length
	let validUnitTests = 0
	let failedUnitTests = 0
	let failedTestsPaths = {}
	
  for (var f = 0; f < logFiles.length; f++) {
		let filePath = logFiles[f]
		let fileContent = fs.readFileSync(filePath, 'utf-8')

		if (fileContent.search('Ok: Normal End') !== -1)
			validUnitTests++
		else {
			failedUnitTests++
			var fPath = logFiles[f].split('/')
			var directory = fPath[fPath.length-2]
			var logFile = fPath[fPath.length-1]
			var fileName = logFile.replace(path.extname(logFile), '')
			if (!failedTestsPaths[directory])
				failedTestsPaths[directory] = []
			failedTestsPaths[directory].push(directory+'/'+fileName)
		}
	}

	unitLogs = {
		totalUnitTests: totalUnitTests,
		validUnitTests: validUnitTests,
		failedUnitTests: failedUnitTests,
		failedPaths: failedTestsPaths,
		files: logFiles
	}

	console.log('unit logs loaded!')
}

// Load unit logs at startup
loadUnitLogs()
fs.watch(UNIT_DIRECTORY, curr => {
  loadUnitLogs()
})

function getUnitLogs() {
  return unitLogs
}

module.exports = getUnitLogs
