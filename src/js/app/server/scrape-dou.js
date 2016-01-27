//http://dou.ua/calendar/
var request = require('request'),
    debug = require('debug')('bot:scrape-dou'),
    cheerio = require('cheerio');

//var html = 'http://dou.ua/calendar';

function DouScraper(){
    debug("DouScraper constructor");
}

DouScraper.prototype.getEventUrls = function(html){
    scrapeMainPage(html).then(function(pageQuantity, urls){
        scrapeAllSecondaryDouPages(html,pageQuantity).then(function(nextPagesUrls){
        urls = urls.concat(nextPagesUrls);
    },
    function(error){console.log("scrapeAllSecondaryDouPages ERROR!",error);});

    console.log("eventsQuantity ",urls.length);
    return urls;}, 
    function(error){console.log(error);});
}

DouScraper.prototype.scrapeEventPage = function(fullUrl) {
    debug("DouScraper scrapeEventPage begin");
    var promise = new Promise(function(resolve, reject) {
    request(fullUrl,function(err,resp,body){
        if (!err && resp.statusCode == 200){
            debug("scrapeEventPage request is successfull");
            var $ = cheerio.load(body,{
                decodeEntities: false
            });
            debug("createModel begin");

            var eventTitle, eventLocation, eventDescription, eventTime = [], 
                eventLink, eventImage, eventPrice;
            var eventPage = $('div.cell.g-right-shadowed.mobtab-maincol');
            //console.log(eventPage);
            eventLink = fullUrl;
            eventTitle = $('div.page-head',eventPage).text().trim();
            //console.log(eventTitle);
            eventLocation = $("div.event-info > div:nth-child(4) > div.dd",eventPage).text().trim();
            eventImage = $('div.event-info > img').attr('src');
            eventDescription = $("article",eventPage).text().trim();
            var eventDate = $("div.event-info > div:nth-child(2) > div.dd",eventPage).text().trim();
            eventTime = $("div.event-info > div:nth-child(3) > div.dd",eventPage).text().trim();
            eventPrice = $("div.event-info > div:nth-child(5) > div.dd",eventPage).text().trim();
            //promise
            var model = {
                eventTitle: eventTitle,
                eventLocation: eventLocation,
                eventLink: eventLink,
                eventDescription: eventDescription,
                eventTime: eventDate+', '+eventTime,
                eventPrice: eventPrice,
                eventImage: eventImage
            }
            //console.log("createModel",model);
            debug("createModel resolve");
            resolve(model);
        }
        else{
            debug("ERROR in scrapeEventPage");
            reject(err);
        }
    });
    });
    debug("return promise");
    return promise;
};

function scrapeMainPage(html){
    var promise = new Promise(function(resolve, reject) {
        request(html, function(error, resp, body){

            if (!error && resp.statusCode == 200){
                debug("Request passed");
                var $ = cheerio.load(body);
                var pageQuantity = $('div.b-paging > span:last-of-type').prev().text();
                var urls = findDouUrls($);
                

                resolve(pageQuantity, urls);

            }
            else{
                reject(error);
            };
        });
    });
    return promise;
};

function scrapeAllSecondaryDouPages(html,quantity){
    var urls = [];
    var promise = new Promise(function(resolve,reject){
        for (var i = 2; i <= quantity; i++){
        var pageUrl = html+'/page-'+i;
        console.log(pageUrl);
        scrapeSecondaryDouPage(pageUrl).then(function(nextUrls){
            urls = urls.concat(nextUrls);
            console.log("urls", urls.length);
        },
        function(error){

            console.log("loadDouUrls ERROR!",error, " at ", pageUrl);
            reject(error);
        })
    }
    resolve(urls);
    });
    return promise;
};

function scrapeSecondaryDouPage(pageUrl){
    //console.log("pageUrl",pageUrl);
    var promise = new Promise(function(resolve,reject){
    request(pageUrl, function(err, resp, body){
        if (!err && resp.statusCode == 200){
            var $ = cheerio.load(body);
            var urls = findDouUrls($);
            console.log(pageUrl,"is loaded");
            resolve(urls);
        }
        else{ reject(err);};
    });
    });
    return promise;
};

function findDouUrls($){
    var urls = [];
    $('div.event > div.title > a').each(function(eventTag){
        var url = $(this).attr('href');
        debug("url",url);
        urls.push(url);
    });
    return urls;
}

module.exports = DouScraper;


