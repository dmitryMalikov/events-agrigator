// run scraping process

var Model = require('./model');
var ParterScraper = require('./scrape-parter.js');
var DouScraper = require('./scrape-dou.js');
var request = require('request'),
    cheerio = require('cheerio');

//var parterEventUrls = []

//function run(){
var html = 'http://parter.ua';
getMainPageUrls(html).then(function(allUrls) {
    console.log("promise call of urls",allUrls.length);
    //console.log(allUrls);
    allUrls.forEach(function(url){
    	var fullUrl = html + url;
    	console.log("start of model creation", fullUrl);
    	var scraper = new ParterScraper();
    	var model = scraper.scrapeEventPage(fullUrl)
    	console.log("model is created", model);
        var parterEvent = new Model(model);
        parterEvent.save(function(err) {
            if (err) {
                console.log('Database err saving: ' + url);
            }
        });
    })
}, function(error) {
	console.log("error ", error);
});


function getMainPageUrls(html) {
    var promise = new Promise(function(resolve, reject) {
    console.log("scrapeMainPage");
    var url, urls = [];
    request(html,function(err,resp, body){
    if (!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        $("div[class='event']").each(function(){
            url = $(this).find('a').attr('href');
            urls.push(url);
        });   
        console.log("resolve, getMainPageUrls urls ",urls.length);
        resolve(urls);
    }
    else{
        console.log("ERROR in getMainPageUrls()");
        reject(err);
    }
    });
    });
    console.log("getMainPageUrls end");
    return promise;
};
