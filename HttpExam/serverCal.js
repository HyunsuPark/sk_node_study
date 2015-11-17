/**
 * http://usejsdoc.org/
 * url/querystring 모듈을 이용한 url파싱
 */
var fs = require('fs');
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var sum = 0;
var server = http.createServer(function(req,res) {
	console.log('url'+req.url);
	var parsed = url.parse(req.url,true);
	console.log(parsed.query.start * parsed.query.end);
})

server.listen(3000);