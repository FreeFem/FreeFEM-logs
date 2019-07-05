const fs = require('fs')
const path = require('path')
const readline = require('readline')

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
	var func = {
		value: getValue(line)
	}
	obj.push(func)
	return func
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
	var time = {value: getValue(line)}
	obj.times.push(time)
}


function loadTiming () {
	console.log('loading timing...')

	if (!fs.existsSync(UNIT_DIRECTORY))
		return

	let unitTestsDirStats = fs.lstatSync(UNIT_DIRECTORY)
	let timingReportPath = TIMING_DIRECTORY + '/' + unitTestsDirStats.dev + '.json'

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

	let output = []

	logFiles.forEach(file => {
		var lineReader = readline.createInterface({input: fs.createReadStream(file)})

		let lastFunc, lastType, lastFlag

		lineReader.on('line', function(line) {
			if (!line || line[0] !== '_')
				return

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
		})
	})

	// output json into file
	fs.writeFileSync(timingReportPath, output)

	timingData = output

	console.log('timing loaded!')
}

// Load timing at startup
loadTiming()

function getTimingData() {
  return timingData
}

module.exports = getTimingData
