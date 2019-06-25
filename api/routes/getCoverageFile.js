var express = require('express');
var fs = require('fs')
var router = express.Router();

/* Get log content */
router.post('/', function(req, res, next) {
	/*
	const directory = req.body.directory
	const file = req.body.file
	const content = fs.readFileSync('../../coverage/index.html')
	res.send(content.text());
	*/
	const content = fs.readFileSync('../coverage/index.html')
	res.send(content.text());
});

module.exports = router;
