// modules===========
var request = require('request'),
    Model = require('./model');
    cheerio = require('cheerio');

function getEventImage($){
    var eventImage = $('img[src*="/img/item/"]').attr('src');
    if (eventImage){
        return eventImage;
    }
    else{
        return "";
    }
};

function getEventDescription($){
    var eventDescription = $('p').text();
    //console.log(eventDescription);
    return eventDescription;
};

function getEventPrice($){
    var eventPrice = $('tr:nth-child(3) > td[align="center"]').first().text();
    return eventPrice;
}

function getEventTime($){
    var eventTime = []
    $('tr:nth-child(1) > td[align="center"]').each(function(){
            var time = $(this).text();
            eventTime.push(time);
        });  
    return eventTime
}

function scrapeEventPage(fullUrl){
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

            var parterEvent = new Model(model);
            parterEvent.save(function(err) {
                if (err) {
                    console.log('Database err saving: ' + url);
                }
            });

            return model;
        }
        else{
            console.log("ERROR in scrapeEventPage");
        }
    });
};

function scrapeParterEvents(html,urls){
    console.log("var scrapeParterEvents");
    var modelArray = [];
    for (var i = 0; i < urls.length; i++){
        fullUrl = html + urls[i];
        //var model = 
        scrapeEventPage(fullUrl);
        //modelArray.push(model);
    }
    //console.log("scrapeParterEvents",modelArray);
    //return modelArray;
}

function getMainPageUrls(html){
    var promise = new Promise(function(resolve, reject) {
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

function run(){
    var html = 'http://parter.ua',
        urls, events;

    getMainPageUrls(html).then(function(urlsArray) {
        console.log("promise call of urls",urlsArray.length);
        urls = urlsArray;
        scrapeParterEvents(html,urls);
        //console.log(events);;
    }, function(error) {
      // handle errors
    });
};

run();
//module.exports = run();
