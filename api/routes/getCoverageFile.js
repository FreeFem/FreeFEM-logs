var express = require('express');
var fs = require('fs')
var router = express.Router();

/* Get log content */
router.get('/', function(req, res, next) {
	const content = fs.readFileSync('../coverage/index.html')
	res.send(content.text());
});

module.exports = router;
