// modules===========
var request = require('request'),
    cheerio = require('cheerio');


// return model through promises
//separete scrapeEventPage into 2 functions

function ParterScraper(){
    console.log("ParterScraper constructor");
}

function getEventImage($) {
    var eventImage = $('img[src*="/img/item/"]').attr('src');
    if (eventImage){
        return eventImage;
    }
    else{
        return "";
    }
};

function getEventDescription($) {
    var eventDescription = $('p').text();   
    return eventDescription;
};

function getEventPrice($) {
    var eventPrice = $('tr:nth-child(3) > td[align="center"]').first().text();
    return eventPrice;
};

function getEventTime($) {
    var eventTime = []
    $('tr:nth-child(1) > td[align="center"]').each(function(){
            var time = $(this).text();
            eventTime.push(time);
        });  
    return eventTime;
};


ParterScraper.prototype.scrapeEventPage = function(fullUrl) {
    console.log("scrapeEventPage begin");
    var promise = new Promise(function(resolve, reject) {
    request(fullUrl,function(err,resp,body){
        if (!err && resp.statusCode == 200){
            console.log("scrapeEventPage request is successfull");
            var $ = cheerio.load(body,{
                decodeEntities: false
            });
            console.log("createModel begin");
            var eventTitle, eventLocation, eventDescription, eventTime = [], 
                eventLink, eventImage, eventPrice;
            var eventPage = $('td.center');
            eventLink = fullUrl;
            eventTitle = $( 'td.center > h1').text()//.replace(/<.*>/g, '. ');
            eventLocation = $('p[class="txt"]',eventPage).text();
            eventImage = getEventImage($);
            eventDescription = getEventDescription($);
            eventTime = getEventTime($);
            eventPrice = getEventPrice($);
            //promise
            var model = {
                eventTitle: eventTitle,
                eventLocation: eventLocation,
                eventLink: eventLink,
                eventDescription: eventDescription,
                eventTime: eventTime,
                eventPrice: eventPrice,
                eventImage: eventImage
            }
            //console.log("createModel",model);
            console.log("createModel resolve");
            resolve(model);
        }
        else{
            console.log("ERROR in scrapeEventPage");
            reject(err);
        }
    });
    });
    console.log("return promise");
    return promise;
};

module.exports = ParterScraper;
