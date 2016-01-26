// run scraping process

var Model = require('./model');
var ParterScraper = require('./scrape-parter.js');
var DouScraper = require('./scrape-dou.js');

//var parterEventUrls = []

//function run(){
var html = 'http://parter.ua';
getMainPageUrls(html).then(function(allUrls) {
    console.log("promise call of urls",urlsArray.length);
    //parterEventUrls = allUrls;
    //scrapeParterEvents(html,parterEventUrls);
    console.log(allUrls);
    allUrls.forEach(function(url){
    	var fullUrl = html + url;
    	//console.log(fullUrl);
    	var model = ParterScraper.scrapeEventPage(fullUrl);
        var parterEvent = new Model(model);
        parterEvent.save(function(err) {
            if (err) {
                console.log('Database err saving: ' + url);
            }
        });
    })
}, function(error) {
// handle errors
});


function getMainPageUrls(html) {
//function getMainPageUrls(html){
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
        console.log("getMainPageUrls urls ",urls.length);
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
