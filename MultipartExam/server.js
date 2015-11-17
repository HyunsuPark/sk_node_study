/**
 * http://usejsdoc.org/
 */
var formidable = require('formidable');
var http = require('http');
var savePath = [];
var fs = require('fs');
var server = http.createServer(function(request, response) {
	if (request.url == '/upload' && request.method == 'POST') {
		var form = new formidable.IncomingForm();
		form.encoding = 'utf-8';
		form.keepExtension = true;
		form.uploadDir = './upload';
		form.parse(request,function(err,fileds,files){
			console.log(fileds.title);
			console.log(files.files.path);
			savePath.push({path :files.files.path , title:fileds.title})
		})
		response.statusCode = 302;
		response.setHeader('Location', './list');
        response.end();
	}else if (request.url == '/list' && request.method == 'GET') {
		response.writeHeader(200, { 'Content-Type': 'text/html; charset=UTF-8' });
		response.write('<html>');
		response.write('<meta charset="UTF-8">');
		response.write('<body>');

		response.write('<h3>Favorite paint</h3>');
		response.write('<div><ul>');
		console.log(savePath);
	   for (var i = 0; i < savePath.length; i++) {
		   response.write('<li>' + '<img src='+savePath[i].path.replace(/\\/gm, '/') + '/>' + savePath[i].title + '</li>');
	   }
	   
	   response.write('</ul></div>');

	   response.write(
	      '<form method="post" action="/upload" enctype="multipart/form-data"><h4>작품이름</h4>' +
	      '<div>작품이름:<input type="text" name="title"></div>' +
	      '<div><input type="file" name="files"></div>' +
	      '<input type="submit" value="upload">' +
	      '</form>'
	      );
	   response.write('</body>');
	   response.write('</html>');
	   response.end();
	} else{
		var path = __dirname + request.url;
		fs.exists(path, function(exists) {
			if (exists) {
				response.writeHead(200,{"Content-Type":"image/*"});
				fs.createReadStream(path).pipe(response);
			} else {
				response.statusCode = 404;
				response.end('can not find');	
			}
		})
	}
});
server.listen(3000);