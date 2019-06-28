var express = require('express');
var fs = require('fs')
var router = express.Router();

var parse = require('lcov-parse');

String.prototype.nthIndexOf = function(pattern, n) {
	var i = -1;
	while (n-- && i++ < this.length) {
		i = this.indexOf(pattern, i);
		if (i < 0) break;
	}
	return i;
}

function getDirectory(path) {
	var nbOfDashes = (path.match(/\//g) || []).length;
	var start = path.nthIndexOf('/', nbOfDashes-2)
	var end = path.lastIndexOf('/')
	return path.substring(start, end)
}

function getFileName(path) {
	var end = path.lastIndexOf('/') + 1
	return path.substring(end)
}

/* Get coverage info */
router.get('/', function(req, res, next) {

	parse('../coverage/report.info', function(err, data) {
		if (err) throw err

		var covInfo = {
			globalNbLines: 0,
			globalNbLinesHit: 0,
			globalLinesCovered: 0,
			globalNbFunc: 0,
			globalNbFuncHit: 0,
			globalFunctionsCovered: 0,
			directories: {}
		}

		// Add directories
		data.map(fileInfo => {
			covInfo.directories[getDirectory(fileInfo.file)] = {}
		})

		// Add file structure
		data.map(fileInfo => {
			covInfo.directories[getDirectory(fileInfo.file)][getFileName(fileInfo.file)] = {
				nbLines: 0,
				nbLinesHit: 0,
				linesCovered: 0,
				nbFunc: 0,
				nbFuncHit: 0,
				functionsCovered: 0,
			}
		})

		// Retrieve info
		data.map(fileInfo => {
			covInfo.globalNbLines += fileInfo.lines.found
			covInfo.globalNbLinesHit += fileInfo.lines.hit
			covInfo.globalNbFunc += fileInfo.functions.found
			covInfo.globalNbFuncHit += fileInfo.functions.hit
			file = covInfo.directories[getDirectory(fileInfo.file)][getFileName(fileInfo.file)]
			file.nbLines += fileInfo.lines.found
			file.nbLinesHit += fileInfo.lines.hit
			file.nbFunc += fileInfo.functions.found
			file.nbFuncHit += fileInfo.functions.hit
		})

		// Compute coverage percentage
		covInfo.globalLinesCovered = covInfo.globalNbLinesHit/covInfo.globalNbLines * 100
		covInfo.globalFunctionsCovered = covInfo.globalNbFuncHit/covInfo.globalNbFunc * 100

		res.send(covInfo)
	})
});

module.exports = router;
