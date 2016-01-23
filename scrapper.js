// scrapper.js

// modules===========
var request = require('request'),
    cheerio = require('cheerio');

// configuration=====

// database==========

var getEventImage = function(){
    console.log("getEventImage");
};

var getEventDescription = function($){
    var eventDescription = $('p[class="txt"]',eventPage).next().text();
    if (!eventDescription){
        console.log("Description is empty in "+fullUrl);
        //var alternativeDesctipion = $(eventPage).html().replace(/<.*>/g, ' ');
        var alternativeDesctipion = $(eventPage).text();
        console.log(alternativeDesctipion);
    }
    return eventDescription;
};

var scrapeEventPage = function(fullUrl){
            request(fullUrl,function(err,resp,body){
                if (!err && resp.statusCode == 200){
                    //console.log('url request works '+fullUrl);
                    var $ = cheerio.load(body,{
                        decodeEntities: false
                    });
                    var eventTitle, eventLocation, eventDescription, eventTime, eventLink, eventImage;
                    var eventPage = $('td.center');
                    eventLink = fullUrl;
                    eventTitle = $( 'h1', eventPage).text()//.replace(/<.*>/g, '. ');
                    //console.log("eventTitle",eventTitle);
                    eventLocation = $('p[class="txt"]',eventPage).text();
                    //console.log("eventLocation",eventLocation);
                    eventDescription = getEventDescription($);
                    //console.log("eventDescription",eventDescription);

                }
                else{
                    console.log("ERROR in scrapeEventPage");
                }
            });
};

var scrapeMainPage = function(){
    //console.log("scrapeMainPage");
    var html = 'http://parter.ua',
        urls = [],
        url, fullUrl;
    request(html,function(err,resp, body){
    if (!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        //console.log(body);
        $("div[class='event']").each(function(){
            url = $(this).find('a').attr('href');
            urls.push(url);
        });
        for (var i = 0; i < urls.length; i++){
            fullUrl = html + urls[i];
            scrapeEventPage(fullUrl);
        }
    }
    else{
        console.log("ERROR in scrapeMainPage()");
    }
    });
}


scrapeMainPage();