var express = require('express');
var fs = require('fs')
var router = express.Router();

/* Get coverage html */
router.post('/', function(req, res, next) {
	const file = req.body.file
	console.log('file: '+file)
	const content = fs.readFileSync(file)
	res.send(content);
});

module.exports = router;
