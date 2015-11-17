/**
 * http://usejsdoc.org/
 * url/querystring 모듈을 이용한 url파싱
 */
/*
var url = require('url');
var urlStr = 'http://idols.com/q?gruop=exid&name=하니';
var parsed = url.parse(urlStr,true);
console.log(parsed);
console.log('protocol : '+parsed.protocol);
console.log('----------------');

var querystring = require('querystring');
var str = parsed.search;
var parsed2 = querystring.parse(str);
console.log(parsed2);

var str2 = 'gruop=걸스데이&member=혜리&member=유라&member=민아';
var parsed3 = querystring.parse(str2);
console.log(parsed3);
var members = parsed3.member; //member라는이름의 배열을 가져옴
for (var i = 0; i < members.length ; i++) {
	console.log(members[i]);
}
*/

var path = './images/img1.jpg';
var fs = require('fs');
var http = require('http');
var server = http.createServer(function(req,res) {
	console.log('version'+req.httpVersion);
	console.log('method'+req.method);
	console.log('url'+req.url);
	console.log('----------------header');
	console.log(req.headers);
	
	if(req.url == '/image') { //이미지처리
		fs.readFile(path, function(err, data) {
			if (err) {
				res.statusCode = 404;
				res.end('can not find');
			} else {
				res.statusCode = 200;
				res.setHeader("Content-Type", "image/jpg");
				res.end(data);
			}
		})
	} else{
		var body = '<html><body><h1>hello!!!</h1></body></html>';
		res.statusCode = 200;
		res.statusMessage = 'OK';
		res.setHeader("Content-Type", "text/html;charset=UTF-8");
		res.setHeader("Content-Length",body.length);
//		이렇게도 가능 
//		res.writeHead(200, {
//			'Content-Type' : 'text/html',
//			'Content-Length' : body.length,
//		});
		res.write(body);
		res.end();
	}
})

server.listen(3000);