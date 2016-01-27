// run scraping process

var Model = require('./model');
//var ParterScraper = require('./scrape-parter.js');
//var DouScraper = require('./scrape-dou.js');
var Scraper = require('./scraper.js');
var request = require('request'),
	debug = require('debug')('bot'),
    cheerio = require('cheerio');



var html2 = "http://dou.ua/calendar";
var scraper2 = Scraper(html2);
var douUrls = scraper2.getEventUrls(html2);



/*
var html3 = "http://dou.ua/calendar/9637/";
var scraper2 = Scraper(html2);
scraper2.scrapeEventPage(html3).then(function(model){
	console.log("promised title", model);
}, function(error) {console.log("ERROR DOU SCRAPE", error, html3);})*/

/*
var html = 'http://parter.ua';
getMainPageUrls(html).then(function(allUrls) {
	console.log("start for each");
    allUrls.forEach(processEventPage);
}, function(error) {console.log("getMainPageUrls error ", error);
});
*/

function processEventPage(url, index, array){
	debug("processEventPage");
	var fullUrl = html + url;
	debug("start of model creation", fullUrl);
	var scraper = Scraper(html);
	scraper.scrapeEventPage(fullUrl).then(addEventToDatabase, 
		function(error) {debug("processEventPage error ", error, fullUrl);
});
};

function addEventToDatabase(eventData){
	   	var parterEvent = new Model(eventData);
	   	debug("addEventToDatabase", parterEvent.eventTitle);
	   	parterEvent.save(function(err) {
	       if (err) {debug('Database err saving: ' + url);}
	   	});
 };

function getMainPageUrls(html) {
    var promise = new Promise(function(resolve, reject) {
	    debug("getMainPageUrls");
	    var url, urls = [];
	    request(html, function(err,resp, body){
		    if (!err && resp.statusCode == 200){
		        var $ = cheerio.load(body);
		        $("div[class='event']").each(function(){
		            url = $(this).find('a').attr('href');
		            urls.push(url);
		        });   
		        debug("resolve", urls.length);
		        resolve(urls);
		    }
		    else{
		        cdebug("ERROR in getMainPageUrls()");
		        reject(err);
		    }
		});
	})
    return promise;
};
