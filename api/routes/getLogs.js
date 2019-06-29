var express = require('express');
var router = express.Router();

const getLogsData = require('../lib/watchLogs')

/**
 * @file
 * Get log jobs
 *
 * Get complete tree and content of the logs directory
 */
router.get('/', function(req, res, next) {
  res.send(getLogsData());
});

module.exports = router;
