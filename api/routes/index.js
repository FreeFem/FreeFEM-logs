var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ api: 'ok' });
});

module.exports = router;
