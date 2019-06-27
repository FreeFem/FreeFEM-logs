var express = require('express');
var fs = require('fs')
var router = express.Router();

//var cheerio = require('cheerio')

var parse = require('lcov-parse');

/* Get coverage info */
router.get('/', function(req, res, next) {
	/*
	const file = req.body.file
	console.log('file: '+file)
	const htmlContent = fs.readFileSync(file)
	const $ = cheerio.load(htmlContent.toString())

	let title
	let summary = [[]]
	let contentHeader = [[]]
	let content = [[]]
	
	title = $('td[class=title]').text()
	
	let trs = $('tr')
	console.log(trs.length)
	
	trs.each((i, tr) => {
			if (i == 0){
				//title = tr.children('td').text()
				console.log(tr.firstChild.firstChild.type)
				console.log(tr.childNodes.find(c => c.type == 'text'))
			}
		}
	)
	const output = {
		title: title,
		summary: summary,
		contentHeader: [[]],
		content: [[]]
	}

	console.log(output)
	res.send(output)
	*/

	parse('../coverage/report.info', function(err, data) {
		if (err) throw err;
		res.send(data)

		/*
		var json = JSON.stringify(data, null, 4);
		fs.writeFile('report.json', json, (err) => { 
			if (err) throw err; 
		})
		*/
	});
});

module.exports = router;
