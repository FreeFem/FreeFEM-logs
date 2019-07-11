const fs = require('fs')
const path = require('path')
const UNIT_DIRECTORY = '../unit' 
const TIMING_DIRECTORY = '../timing'
const watchUnitLogs = require('./watchUnitLogs')

const functionDefinition = '__FUNCTION_DEFINITION__ '
const typeDefinition = '__TYPE_DEFINITION__ '
const timeElapsed = '__TIME_ELAPSED__ '
const parameterDefinition = '__PARAMETER_DEFINITION__ '

let timingData = {}

function getFlag(line) {
	return line.substring(0, line.indexOf(' ')) + ' '
}

function getValue(line) {
	return line.substring(line.indexOf(' ') + 1)
}


function addFunc(functions, line) {
	var funcName = getValue(line)
	var func = funcName
	if (functions[funcName]) { // function already exists (duplicate or same name!)
		let i = 2
		while (functions[func]) {
			func = funcName+'('+i+')'
			i++
		}
	}
	functions[func] = {}
	return functions[func]
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

	let output = {
		functions: {}
	}

	let unitLogs = watchUnitLogs()

	for (var f = 0; f < unitLogs.logFiles.length; f++) {
		let filePath = unitLogs.logFiles[f]
		let fileContent = fs.readFileSync(filePath, 'utf-8')

		var lines = fileContent.split(/\n|\r/).filter(Boolean);

		let lastFunc, lastType, lastFlag

		for (var i = 0; i < lines.length; i++) {
			let line = lines[i]

			if (!line || line[0] !== '_')
				continue

			var lineFlag = getFlag(line)
			switch(lineFlag) {
				case functionDefinition:
					lastFunc = addFunc(output.functions, line)
					lastFlag = lineFlag
					break;
				case typeDefinition:
					if (!lastFunc)
						continue
					lastType = addType(lastFunc, line)
					lastFlag = lineFlag
					break;
				case parameterDefinition:
					if (!lastFunc)
						continue
					lastType = addParam(lastFunc, line)
					lastFlag = lineFlag
					break;
				case timeElapsed:
					if (lastType && (lastFlag === typeDefinition || lastFlag === parameterDefinition))
						addTime(lastType, line)
					else if (lastFunc && lastFlag === functionDefinition)
						addTime(lastFunc, line)
					break;
				default:
					break;
			}
		}
	}

	// Output current timing into timing folder
	let unitDirStats = fs.lstatSync(UNIT_DIRECTORY)
	let timingReportPath = TIMING_DIRECTORY + '/' + unitDirStats.dev + '.json'
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

	Object.entries(finalOutput.functions).map(([fi, func]) => {
		if (finalOutput.functions[fi].types) {
			// for each type
			for (var ti = 0; ti < finalOutput.functions[fi].types.length; ti++) {
				if (finalOutput.functions[fi].types[ti].times) {
					for (var t = 0; t < finalOutput.functions[fi].types[ti].times.length; t++) {
						finalOutput.functions[fi].types[ti].times[t] = []
						timingFilesData.forEach(file => {
							var time = undefined
							if (file.functions[fi])
								time = file.functions[fi].types[ti].times[t]
							finalOutput.functions[fi].types[ti].times[t].push(time)
						})
					}
				}
			}
		}
		if (finalOutput.functions[fi].parameters) {
			// for each parameter
			for (var pi = 0; pi < finalOutput.functions[fi].parameters.length; pi++) {
				if (finalOutput.functions[fi].parameters[pi].times) {
					for (var t = 0; t < finalOutput.functions[fi].parameters[pi].times.length; t++) {
						finalOutput.functions[fi].parameters[pi].times[t] = []
						timingFilesData.forEach(file => {
							var time = undefined
							if (file.functions[fi])
								time = file.functions[fi].parameters[pi].times[t]
							finalOutput.functions[fi].parameters[pi].times[t].push(time)
						})
					}
				}
			}
		}
		if (finalOutput.functions[fi].times) {
			// for each time
			for (var t = 0; t < finalOutput.functions[fi].times.length; t++) {
				finalOutput.functions[fi].times[t] = []
				timingFilesData.forEach(file => {
					var time = undefined
					if (file.functions[fi])
						time = file.functions[fi].times[t]
					finalOutput.functions[fi].times[t].push(time)
				})
			}
		}
	})

	timingData = finalOutput
	console.log('timing loaded!')
}

// Load timing at startup
loadTiming()
fs.watch(UNIT_DIRECTORY, curr => {
  loadTiming()
})

function getTimingData() {
  return timingData
}

module.exports = getTimingData
