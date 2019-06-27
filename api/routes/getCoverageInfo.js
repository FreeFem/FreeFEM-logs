var express = require('express');
var fs = require('fs')
var router = express.Router();

var parse = require('lcov-parse');

/* Get coverage info */
router.get('/', function(req, res, next) {
	
	parse('../coverage/report.info', function(err, data) {
		if (err) throw err;

		var covInfo = {}

		data.map(fileData => {
			covInfo[fileData.file] = {
				numberOfLines: 0,
				numberOfLinesCovered: 0
			}
			covInfo[fileData.file].numberOfLines += fileData.lines.found
			covInfo[fileData.file].numberOfLinesCovered += fileData.lines.hit
		})

		console.log(covInfo)

		res.send(covInfo)
		/*
		var json = JSON.stringify(data, null, 4)
		fs.writeFile('report.json', json, (err) => { 
			if (err) throw err; 
		})
		*/
	});
});

module.exports = router;
