/**
 * http://usejsdoc.org/
 * url/querystring 모듈을 이용한 url파싱
 */
var path = './images/img1.jpg';
var fs = require('fs');
var http = require('http');
var server = http.createServer(function(req,res) {
	console.log('url'+req.url);
	
	//index
	if(req.url == '/') { //이미지처리
		res.writeHead(200, {'Content-Type' : 'text/html'});
		fs.createReadStream('index.html').pipe(res);
		return;
	} 
	var path = __dirname + req.url;
	console.log(path);
	fs.exists(path, function(exists) {
		if (exists) {
			res.writeHead(200,{"Content-Type":"image/*"});
			fs.createReadStream(path).pipe(res);
		} else {
			res.statusCode = 404;
			res.end('can not find');	
		}
	})
})

server.listen(3000);