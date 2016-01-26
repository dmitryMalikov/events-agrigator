// run scraping process

var Model = require('./model');
var ParterScraper = require('./scrape-parter.js');
var DouScraper = require('./scrape-dou.js');
var request = require('request'),
    cheerio = require('cheerio');


var html = 'http://parter.ua';
getMainPageUrls(html).then(function(allUrls) {
	console.log("start for each");
    allUrls.forEach(processEventPage);
}, function(error) {console.log("getMainPageUrls error ", error);
});

function processEventPage(url, index, array){
	console.log("processEventPage");
	var fullUrl = html + url;
	console.log("start of model creation", fullUrl);
	var scraper = new ParterScraper;
	scraper.scrapeEventPage(fullUrl).then(addEventToDatabase, 
		function(error) {console.log("processEventPage error ", error);
});
};

function addEventToDatabase(eventData){
		console.log("addEventToDatabase");
	   	var parterEvent = new Model(eventData);
	   	parterEvent.save(function(err) {
	       if (err) {console.log('Database err saving: ' + url);}
	   	});
 };

function getMainPageUrls(html) {
    var promise = new Promise(function(resolve, reject) {
	    console.log("getMainPageUrls");
	    var url, urls = [];
	    request(html, function(err,resp, body){
		    if (!err && resp.statusCode == 200){
		        var $ = cheerio.load(body);
		        $("div[class='event']").each(function(){
		            url = $(this).find('a').attr('href');
		            urls.push(url);
		        });   
		        console.log("resolve", urls.length);
		        resolve(urls);
		    }
		    else{
		        console.log("ERROR in getMainPageUrls()");
		        reject(err);
		    }
		});
	})
    return promise;
};
