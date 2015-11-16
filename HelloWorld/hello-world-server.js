//var http = require('http');
//모듈의 캐싱
//var hello = require('./myModual1.js');
//var hello2 = require('./myModual1.js');
//hello.howAreYou();
//hello2.howAreYou();
//모듈의 캐싱 end

//exports 로만작성
//var hello3 = require('./myModual2.js');
//var greeting =  hello3.createGreeting();
//greeting.hello('steve jobs');
//greeting.howAreYou();

//클래스작성
//var hello4 = require('./myModual3.js');
//var obj = new hello4();
//obj.howAreYou();

//객체모듈
var hello5 = require('./myModual4.js');
hello5.hello();
console.log(hello5.count);

//http.createServer(function handler(req, res) {
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('Hello World\n');
//}).listen(1337, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:1337/');
