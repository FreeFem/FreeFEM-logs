var express = require('express');
var fs = require('fs')
var router = express.Router();

/* Get log directories */
router.post('/', function(req, res, next) {
	const job = req.body.job
	const directories = fs.readdirSync('../logs/'+job)
	res.send(JSON.stringify(directories));
});

module.exports = router;
