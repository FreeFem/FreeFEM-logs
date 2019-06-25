var express = require('express');
var fs = require('fs')
var router = express.Router();

/* Get log jobs */
router.get('/', function(req, res, next) {
	const jobs = fs.readdirSync('../logs')
	res.send(JSON.stringify(jobs));
});

module.exports = router;
