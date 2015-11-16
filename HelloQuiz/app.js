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

/**
 * 파일체크
 */
var checkFileFunc  = function(callback) {
	fs.stat(file, function(err, stats) {
		// 에러체크
		if (err) {
			callback(err);
		}else{
			if (!stats.isFile()) {
				callback('not find');
			}else{
				callback(null,'done');
			}
		}
	});
}

/**
 * 파일읽기
 */
var readFileFunc = function(callback) {
	fs.readFile(file, 'utf8', function(err, data) {
		text = data;
		callback(null, data);
	});
};

/**
 * 파일쓰기
 */
var writeFileFunc = function(callback) {
	fs.writeFile(file2, text, function(err) {
		if (err) {
			console.log('error');
			return;
		}
	});
};

async.series([checkFileFunc, readFileFunc, writeFileFunc ], function(err, results) {
	if (err) {
		console.log(err);
		return;
	}
	console.log(results);
});
