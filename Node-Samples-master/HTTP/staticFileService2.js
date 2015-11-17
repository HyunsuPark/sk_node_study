console.log('== 정적 파일 서버 샘플\nUSAGE : resources 폴더에 jpg, mp3, mp4파일 준비\nServer/reources/image.jpg로 요청');

var http = require('http');
var fs = require('fs');
var pathUtil = require('path');

var server = http.createServer(function(req, res) {
   
	console.log('method : ' + req.method + ' url : ' + req.url);
	// if ( request.method.toLowerCase() == 'get' && request.url == '/favicon.ico') {
	// 	// 파비콘 응답
	// 	return;
	// }
	// 리소스 파일 경로
	var path = __dirname + pathUtil.sep + 'resources' + req.url;
   console.log('Resource Path :', path);

   // 파일 접근 가능 여부 확인   
   fs.access(path, fs.R_OK, function(err) {
      // 접근 불가능시 404 에러      
      if ( err ) {
         res.statusCode = 404;
         res.end('Can not find Resource');
         return;
      }
      
      // 파일이 존재하면 파일을 읽어서 응답
      fs.readFile(path, function(err, data) {
         if ( err ) {
            // 파일은 있지만 읽지 못하면 500번 에러
            res.statusCode = 500;
            res.end('Can not read Resource');
            return;
         }
         var ext = pathUtil.extname(path).toLowerCase();
         console.log(ext);
         var contentType;
         switch (ext) {
            case '.jpg':
               contentType = 'image/jpg';
               break;
            case '.mp3':
               contentType = 'audio/mp3';
               break;
            case '.mp4':
               contentType = 'video/mp4';
               break;
            default:
               contentType = 'text/plain';
         }
         res.statusCode = 200;
         res.setHeader('Content-type',contentType);
         res.end(data);
      });			
   });
});
server.listen(3000);