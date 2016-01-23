// scrapper.js

// modules===========
var request = require('request'),
	cheerio = require('cheerio');

// configuration=====

// database==========



var html = 'http://parter.ua';
var urls = [];

request(html,function(err,resp, body){
	if (!err && resp.statusCode == 200){
		var $ = cheerio.load(body);
		//console.log(body);
		$("div[class='event']").each(function(){
			var url = $(this).find('a').attr('href');
			urls.push(url);
		});
		//console.log(urls);
		//urls.length
		//for (var i = 0; i < urls.length; i++){
		for (var i = 1; i < 2; i++){
			//console.log(i);
			var fullUrl = html + urls[i];
			//console.log(fullUrl);
			request(fullUrl,function(err,resp,body){
				//console.log('outer url request works '+urls[i]);
				if (!err && resp.statusCode == 200){
					//console.log('url request works '+fullUrl);
					var $ = cheerio.load(body,{
						decodeEntities: false
					});
					var eventTitle, eventLocation, eventDescription, eventTime, eventLink;

					var eventPage = $('td.center');
					eventLink = fullUrl;
					eventTitle = $( 'h1', eventPage).text()//.replace(/<.*>/g, '. ');
					console.log("eventTitle",eventTitle);
					eventLocation = $('p[class="txt"]',eventPage).text();
					//console.log("eventLocation",eventLocation);
					eventDescription = $('p[class="txt"]',eventPage).next().text()
					console.log("eventDescription",eventDescription);

				}
			});
		}
	}
});

