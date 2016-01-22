// scrapper.js

// modules===========
var request = require('request'),
	cheerio = require('cheerio');

// configuration=====

// database==========



var html = 'http://vk.com/absurdpabs';

request(html,function(err,resp, body){
	if (!err && resp.statusCode === 200){
		var $ = cheerio.load(body);
		console.log($(#public_events);
		//#public_events.a	
	}
});