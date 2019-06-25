var express = require('express');
var fs = require('fs')
var router = express.Router();

/* Get log files */
router.post('/', function(req, res, next) {
	const job = req.body.job
	const directory = req.body.directory
	const files = fs.readdirSync('../logs/'+job+'/'+directory)
	res.send(JSON.stringify(files));
});

module.exports = router;
