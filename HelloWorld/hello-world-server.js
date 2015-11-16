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
//var hello5 = require('./myModual4.js');
//hello5.hello();
//console.log(hello5.count);

//흐름제어
function task1() {
	console.log('first task started');
	setTimeout(function() {
		console.log('first task done!');
	}, 3000);
}

function task2() {
	console.log('first task2 started');
	setTimeout(function() {
		console.log('first task2 done!');
	}, 1000);
} 
// task1();
// task2();

// 흐름제어 개선 1
// callback 을 이용
function task3(callback) {
	console.log('#first task started');
	setTimeout(function() {
		console.log('first task done!');
		callback();
	}, 3000);
}

function task4() {
	console.log('first task2 started');
	setTimeout(function() {
		console.log('first task2 done!');
	}, 1000);
}

//task3(function() {
//	task4();
//})

// 흐름제어모듈 async
var async = require('async');
async.series([ function(callback) {
	console.log('#first task started');
	setTimeout(function() {
		console.log('#first task done!');
		callback(null, 'done'); // err,result값
	}, 3000);
}, function(callback) {
	console.log('#second task started');
	setTimeout(function() {
		console.log('#second task done!');
		callback(null, 'done'); // err,result값
	}, 1000);
} ], function(err, results) {
	console.log('all ' + results);
});

// http.createServer(function handler(req, res) {
// res.writeHead(200, {'Content-Type': 'text/plain'});
// res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');
