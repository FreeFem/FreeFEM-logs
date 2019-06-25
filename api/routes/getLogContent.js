var express = require('express');
var fs = require('fs')
var router = express.Router();

/* Get log content */
router.post('/', function(req, res, next) {
	const job = req.body.job
	const directory = req.body.directory
	const file = req.body.file
	const content = fs.readFileSync('../logs/'+job+'/'+directory+'/'+file)
	res.send(JSON.stringify(content.toString()));
});

module.exports = router;
