var ParterScraper = require('./scrape-parter.js');
var DouScraper = require('./scrape-dou.js'),
	debug = require('debug')('bot:scraper');


function makeScaraper(html){
	debug("makeScraper");
	if (html === 'http://parter.ua'){
		return new ParterScraper();
	}
	if (html === 'http://dou.ua/calendar') {
		return new DouScraper();
	}
}

module.exports = function(html){
	debug("scraper export");
	return makeScaraper(html);
}