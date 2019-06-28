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
				functionsCovered: 0
			}
		})

		// Add file structure
		data.map(fileInfo => {
			covInfo.directories[getDirectory(fileInfo.file)][getFileName(fileInfo.file)] = {
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

			file = covInfo.directories[getDirectory(fileInfo.file)][getFileName(fileInfo.file)]
			file.nbLinesHit += fileInfo.lines.hit
			file.nbLines += fileInfo.lines.found
			file.nbFunctionsHit += fileInfo.functions.hit
			file.nbFunctions += fileInfo.functions.found
		})

		// Compute coverage percentage
		covInfo.linesCovered = covInfo.nbLinesHit/covInfo.nbLines * 100
		covInfo.functionsCovered = covInfo.nbFunctionsHit/covInfo.nbFunctions * 100

		res.send(covInfo)
	})
});

module.exports = router;
