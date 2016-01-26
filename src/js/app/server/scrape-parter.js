// modules===========
var request = require('request'),
    //del = require('./model');
    cheerio = require('cheerio');

function ParterScraper(){
}


ParterScraper.prototype.getEventImage = function ($) {
//function getEventImage($){
    var eventImage = $('img[src*="/img/item/"]').attr('src');
    if (eventImage){
        return eventImage;
    }
    else{
        return "";
    }
};

ParterScraper.prototype.getEventDescription = function ($) {
//function getEventDescription($){
    var eventDescription = $('p').text();
    //console.log(eventDescription);
    return eventDescription;
};

ParterScraper.prototype.getEventPrice = function ($) {
//function getEventPrice($){
    var eventPrice = $('tr:nth-child(3) > td[align="center"]').first().text();
    return eventPrice;
};

ParterScraper.prototype.getEventTime = function ($) {
//function getEventTime($){
    var eventTime = []
    $('tr:nth-child(1) > td[align="center"]').each(function(){
            var time = $(this).text();
            eventTime.push(time);
        });  
    return eventTime;
};

ParterScraper.prototype.scrapeEventPage = function (fullUrl) {
//function scrapeEventPage(fullUrl){
    request(fullUrl,function(err,resp,body){
        if (!err && resp.statusCode == 200){
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




//nsole.log(typeof ParterScraper.run);
module.exports = ParterScraper;
