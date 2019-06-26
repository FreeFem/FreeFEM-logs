var express = require('express');
var fs = require('fs')
var router = express.Router();

var cheerio = require('cheerio')

/* Get coverage html */
router.post('/', function(req, res, next) {
	const file = req.body.file
	console.log('file: '+file)
	const htmlContent = fs.readFileSync(file)
	const $ = cheerio.load(htmlContent.toString())

	let title
	let summary = [[]]
	let contentHeader = [[]]
	let content = [[]]

	title = $('td[class=title]').text()
	
	let rulers = $('td[class=ruler]') // <-- used to know where tf we are in the html
	let summaryTdHeaders = rulers.nextAll('td[class=headerItem]')
	summaryTdHeaders.each(tdHeader => {
				let tdElts = []
				tdElts.push(tdHeader)
				tdHeader.nextAll().each(tdElt => {
					tdElts.push(tdElt)
				}
			)
		}
	)

	const output = {
		title: title,
		summary: summary,
		contentHeader: [],
		content: []
	}

	console.log(output)
	res.send(output)
});

module.exports = router;
