// modules===========
var request = require('request'),
    cheerio = require('cheerio');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function ParterScraper(url){
    console.log("ParterScraper constructor");
    this.url = url;
    this.init();
}


ParterScraper.prototype.init = function () {
    console.log("ParterScraper init");
    var self = this;
    var model;
    self.on('loaded', function (html) {
        model = self.scrapeEventPage(html);
        self.emit('complete', model);
    });
}


ParterScraper.prototype.getEventImage = function ($) {
    var eventImage = $('img[src*="/img/item/"]').attr('src');
    if (eventImage){
        return eventImage;
    }
    else{
        return "";
    }
};

ParterScraper.prototype.getEventDescription = function ($) {
    var eventDescription = $('p').text();   
    return eventDescription;
};

ParterScraper.prototype.getEventPrice = function ($) {
    var eventPrice = $('tr:nth-child(3) > td[align="center"]').first().text();
    return eventPrice;
};

ParterScraper.prototype.getEventTime = function ($) {
    var eventTime = []
    $('tr:nth-child(1) > td[align="center"]').each(function(){
            var time = $(this).text();
            eventTime.push(time);
        });  
    return eventTime;
};

ParterScraper.prototype.scrapeEventPage = function (fullUrl) {
    console.log("scrapeEventPage begin");
    request(fullUrl,function(err,resp,body){
        if (!err && resp.statusCode == 200){
            console.log("scrapeEventPage request is successfull");
            var $ = cheerio.load(body,{
                decodeEntities: false
            });
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

            var model = {
                eventTitle: eventTitle,
                eventLocation: eventLocation,
                eventLink: eventLink,
                eventDescription: eventDescription,
                eventTime: eventTime,
                eventPrice: eventPrice,
                eventImage: eventImage
            }
            console.log("scrapeEventPage",model);

            return model;
        }
        else{
            console.log("ERROR in scrapeEventPage");
        }
    });
};

module.exports = ParterScraper;
