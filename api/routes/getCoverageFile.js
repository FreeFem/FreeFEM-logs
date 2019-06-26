var express = require('express');
var fs = require('fs')
var router = express.Router();

var cheerio = require('cheerio')

/* Get coverage html */
router.post('/', function(req, res, next) {
	var file = req.body.file
	console.log('file: '+file)
	var htmlString = fs.readFileSync(file)
	
	var $ = cheerio.load(htmlString)
	
	var content = $('td')
		.filter((_, td) => $(td).attr('class') !== undefined)
		.map((_, td) => (
			{
				class: $(td).attr('class'),
				text: $(td).text()
			}
		));
	
	//content.map((_, td) => console.log('class: '+td.class+' text: '+td.text))
	
	var output = {};
	content.map((_, td) => output[_] =
	{
		class: td.class,
		test: td.text
	})
	
	console.log(output)
	
	res.send(output)
});

module.exports = router;
