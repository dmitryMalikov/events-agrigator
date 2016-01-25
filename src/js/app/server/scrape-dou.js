//http://dou.ua/calendar/

var request = require('request'),
    //mongoose = require('mongoose'),
    cheerio = require('cheerio');


var html = 'http://dou.ua/calendar',
    urls = [], 
    url;

/*var scrapeDouPage = function(html){
request(html,function(err,resp, body){
    if (!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        $("div[class='event']").each(function(){
            url = $(this).find('a').attr('href');
            urls.push(url);
        });
    }
    else{
        console.log("ERROR in scrapeDouPage()");
    }
    });
console.log(urls);
}();
*/

//parse through all events
/*
do{

}while(hmlm)
*/

    


