const fs = require('fs')
const path = require('path')
const UNIT_DIRECTORY = '../../FreeFem-sources/unit'
const TIMING_DIRECTORY = '../timing'
let timingData = {}

const functionDefinition = '__FUNCTION_DEFINITION__ '
const typeDefinition = '__TYPE_DEFINITION__ '
const timeElapsed = '__TIME_ELAPSED__ '
const parameterDefinition = '__PARAMETER_DEFINITION__ '


function getFlag(line) {
	return line.substring(0, line.indexOf(' ')) + ' '
}

function getValue(line) {
	return line.substring(line.indexOf(' ') + 1)
}


function addFunc(obj, line) {
	var func = getValue(line)
	obj[func] = {}
	return obj[func]
}

function addType(obj, line) {
	if (!obj.types)
		obj.types = []
	var type = {value: getValue(line)}
	obj.types.push(type)
	return type
}

function addParam(obj, line) {
	if (!obj.parameters)
		obj.parameters = []
	var parameter = {value: getValue(line)}
	obj.parameters.push(parameter)
	return parameter
}

function addTime(obj, line) {
	if (!obj.times)
		obj.times = []
	obj.times.push(getValue(line))
}


function loadTiming () {
	console.log('loading timing...')

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

	let output = {}

	for (var f = 0; f < logFiles.length; f++) {
		var lines = require('fs').readFileSync(logFiles[f], 'utf-8')
		.split(/\n|\r/)
    .filter(Boolean);

		let lastFunc, lastType, lastFlag

		for (var i = 0; i < lines.length; i++) {
			let line = lines[i]

			if (!line || line[0] !== '_')
				continue

			var lineFlag = getFlag(line)
			switch(lineFlag) {
				case functionDefinition:
					lastFunc = addFunc(output, line)
					lastFlag = lineFlag
					break;
				case typeDefinition:
					lastType = addType(lastFunc, line)
					lastFlag = lineFlag
					break;
				case parameterDefinition:
					lastType = addParam(lastFunc, line)
					lastFlag = lineFlag
					break;
				case timeElapsed:
					if (lastFlag === typeDefinition || lastFlag === parameterDefinition)
						addTime(lastType, line)
					else if (lastFlag === functionDefinition)
						addTime(lastFunc, line)
					break;
				default:
					break;
			}
		}
	}

	// Ooutput current timing into timing folder
	let unitTestsDirStats = fs.lstatSync(UNIT_DIRECTORY)
	let timingReportPath = TIMING_DIRECTORY + '/' + unitTestsDirStats.dev + '.json'
	fs.writeFileSync(timingReportPath, JSON.stringify(output, null, 2))

	let timingFiles = fs.readdirSync(TIMING_DIRECTORY)
	let timingFilesData = []
	for (var i = 0; i < timingFiles.length; i++) {
		data = fs.readFileSync(TIMING_DIRECTORY+'/'+timingFiles[i])
		timingFilesData.push(JSON.parse(data))
	}

	// Use first report as template to go through all the reports
	// deep copy of the first timing report
	let finalOutput = JSON.parse(JSON.stringify(timingFilesData[0]))

	//for (var fi = 0; fi < finalOutput.length; fi++) { // for each function
	Object.entries(finalOutput).map(([fi, func]) => {
		if (finalOutput[fi].types) {
			// for each type
			for (var ti = 0; ti < finalOutput[fi].types.length; ti++) {
				if (finalOutput[fi].types[ti].times) {
					for (var t = 0; t < finalOutput[fi].types[ti].times.length; t++) {
						finalOutput[fi].types[ti].times[t] = []
						timingFilesData.forEach(file => {
							var time = undefined
							if (file[fi])
								time = file[fi].types[ti].times[t]
							finalOutput[fi].types[ti].times[t].push(time)
						})
						console.log(finalOutput[fi].types[ti].times[t])
					}
				}
			}
		}
		if (finalOutput[fi].parameters) {
			// for each parameter
			for (var pi = 0; pi < finalOutput[fi].parameters.length; pi++) {
				if (finalOutput[fi].parameters[pi].times) {
					for (var t = 0; t < finalOutput[fi].parameters[pi].times.length; t++) {
						finalOutput[fi].parameters[pi].times[t] = []
						timingFilesData.forEach(file => {
							var time = undefined
							if (file[fi])
								time = file[fi].parameters[pi].times[t]
							finalOutput[fi].parameters[pi].times[t].push(time)
						})
						console.log(finalOutput[fi].parameters[pi].times[t])
					}
				}
			}
		}
		if (finalOutput[fi].times) {
			// for each time
			for (var t = 0; t < finalOutput[fi].times.length; t++) {
				finalOutput[fi].times[t] = []
				timingFilesData.forEach(file => {
					var time = undefined
					if (file[fi] && file[fi].times)
						time = file[fi].times[t]
					finalOutput[fi].times[t].push(time)
				})
				console.log(finalOutput[fi].times[t])
			}
		}
	})

	timingData = finalOutput

	console.log('timing loaded!')
}

// Load timing at startup
loadTiming()

function getTimingData() {
  return timingData
}

module.exports = getTimingData
