/**
 * http://usejsdoc.org/
 * 비동기식 파일 읽고 쓰기
 * 순서보장 모듈을 이용하여
 */
var fs = require('fs');
var async = require('async');
var file = "./README.md";
var file2 = "./HELLO2.md";
var text = "";

var readFileFunc = function(callback) {
	fs.stat(file, function(err, stats) {
		// 에러체크
		if (err) {
			callback(err);
		}

		if (stats.isFile()) {
			fs.readFile(file, 'utf8', function(err, data) {
				text = data;
				callback(null, data);
			});
		}
	});
};

var writeFileFunc = function(callback) {
	fs.writeFile(file2, text, function(err) {
		if (err) {
			console.log('error');
			return;
		}
	});
};

async.series([ readFileFunc, writeFileFunc ], function(err, results) {
	if (err) {
		console.log('error');
		return;
	}
	console.log(results);
});
