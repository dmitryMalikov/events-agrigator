// scrapper.js

// modules===========
var request = require('request'),
	cheerio = require('cheerio');

// configuration=====

// database==========



var html = 'http://parter.ua/ua.html';
var urls = [];

request(html,function(err,resp, body){
	if (!err && resp.statusCode == 200){
		var $ = cheerio.load(body);
		//console.log(body);
		$("div[class='event']").each(function(){
			var url = $(this).find('a').attr('href');
			urls.push(url);
		});
		console.log(urls);
		//class = event
		//a class = eventtitle, innerHtml - title
		/*$(div.event,table).each(function(){
			var url = attr.attr('href');
			urls.push(url);
		});
		console.log(ulrs);*/
	}
});

