var ParterScraper = require('./scrape-parter.js');
var DouScraper = require('./scrape-dou.js');


function makeScaraper(html){
	console.log("makeScraper");
	if (html === 'http://parter.ua'){
		return new ParterScraper();
	}
	if (html === 'http://dou.ua/calendar') {
		return new DouScraper();
	}
}

module.exports = function(html){
	console.log("scraper export");
	return makeScaraper(html);
}