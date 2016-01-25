// scrapper.js

// modules===========
var request = require('request'),
    mongoose = require('mongoose'),
    RSVP = require('rsvp'),
    cheerio = require('cheerio');

// configuration=====

// database==========
var scrapeEventPage = function(fullUrl){
    request(fullUrl,function(err,resp,body){
        if (!err && resp.statusCode == 200){
            var $ = cheerio.load(body,{
                decodeEntities: false
            });
            var eventTitle, eventLocation, eventDescription, eventTime, eventLink, eventImage;
            var eventPage = $('td.center');
            eventLink = fullUrl;
            eventTitle = $( 'td.center > h1').text()//.replace(/<.*>/g, '. ');
            eventLocation = $('p[class="txt"]',eventPage).text();
            //eventDescription = getEventDescription($);
            //console.log("eventDescription",eventDescription);
        }
        else{
            console.log("ERROR in scrapeEventPage");
        }
    });
};

var scrapeParterEvents = function(html,urls){
    console.log("var scrapeParterEvents");
    for (var i = 0; i < urls.length; i++){
        fullUrl = html + urls[i];
        scrapeEventPage(fullUrl);
        //console.log("scrapeEventPage(fullUrl);",fullUrl);
    }
}

var getMainPageUrls = function(html){
    var promise = new RSVP.Promise(function(resolve, reject) {
    console.log("scrapeMainPage");
    var url, fullUrl,
        urls = [];
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
    return promise;
};

var run = function(){
    var html = 'http://parter.ua',
        urls;

    getMainPageUrls(html).then(function(urlsArray) {
        console.log("promise call of urls",urlsArray.length);
        urls = urlsArray;
        scrapeParterEvents(html,urls);
    }, function(error) {
      // handle errors
    });
}();


/*
var getEventImage = function($){
    console.log("getEventImage");
    var eventLink;
};

var getEventDescription = function($){
    var eventDescription = $('p[class="txt"]',eventPage).next().text();
    if (!eventDescription){
        //console.log("Description is empty in "+fullUrl);
        //var alternativeDesctipion = $(eventPage).html().replace(/<.*>/g, ' ');
        var alternativeDesctipion = $(eventPage).text();
        console.log(alternativeDesctipion);
    }
    return eventDescription;
};




*/