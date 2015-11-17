/**
 * http://usejsdoc.org/
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res) {
	console.log(req);
	if (req.url == '/') {
		res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
		fs.createReadStream('index.html').pipe(res);
		return;
	} else if (req.url == '/upload' && req.method == 'POST') {
		var body = '';
		req.on('data', function(chunk) {
			console.log('got %d byte' , chunk.length);
			body += chunk;
		});
		
		req.on('end', function() {
			console.log('end : '+body);
		});
	}
});

server.listen(3000,function(){
	console.log('start');
});