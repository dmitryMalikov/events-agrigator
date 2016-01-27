// run scraping process

var Model = require('./model');
//var ParterScraper = require('./scrape-parter.js');
//var DouScraper = require('./scrape-dou.js');
var Scraper = require('./scraper.js');
var request = require('request'),
	debug = require('debug')('bot'),
    cheerio = require('cheerio');


var html = 'http://parter.ua';
getMainPageUrls(html).then(function(allUrls) {
	console.log("start for each");
    allUrls.forEach(processEventPage);
}, function(error) {console.log("getMainPageUrls error ", error);
});

function processEventPage(url, index, array){
	debug("processEventPage");
	var fullUrl = html + url;
	debug("start of model creation", fullUrl);
	var scraper = Scraper(html);
	scraper.scrapeEventPage(fullUrl).then(addEventToDatabase, 
		function(error) {debug("processEventPage error ", error);
});
};

function addEventToDatabase(eventData){
		debug("addEventToDatabase");
	   	var parterEvent = new Model(eventData);
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
