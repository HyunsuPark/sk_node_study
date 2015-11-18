/**
 * 기본node만 사용
 * rest api 만들기
 * #나중에 배열을 디비로만 바꾸자
 */

//기본자료
var movieList = ['아바타','스타워즈','인터스텔라'];
var movieDetail = {
	'아바타' : {
		'director' : '제임스 카메론'
	},
	'스타워즈' : {
		'director' : '조지 루카스'
	},
	'인터스텔라' : {
		'director' : '크리스토펒놀란'
	}
};

//메소드 분기
var http = require('http');
var server = http.createServer(function(req, res) {
	var method = req.method.toLocaleLowerCase();
	console.log(method);
	if (method == 'get') {
		handleGetRequest(req, res);
	} else if (method == 'post') {
		handlePostRequest(req, res);
	} else if (method == 'put') {
		handlePutRequest(req, res);
	} else if (method == 'delete') {
		handleDeleteRequest(req, res);
	} else{
		res.statusCode = 404;
		res.end('404');
	}
});

server.listen(3000, function() {
	console.log('start');
})


function handleGetRequest(req,res) {
	var url = req.url;
	if (url == '/movies') {
		res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
		res.end(JSON.stringify(movieList));
	} else {
		var itemName = url.split('/')[2];
		itemName = decodeURI(itemName);
		console.log(itemName);
		var item = movieDetail[itemName];
		console.log(item);
		if (item) {
			res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
			res.end(JSON.stringify(item));
		} else {
			res.statusCode = 404;
			res.end('404');
		}
	}
}

var querystring = require('querystring');
function handlePostRequest(req,res) {
	var url = req.url;
	if (url == '/movies') {
		var body = '';
		req.on('data', function(chunk) {
			body += chunk;
		});
		
		req.on('end', function() {
			var parsed = querystring.parse(body);
			movieList.push(parsed.title);
			movieDetail[parsed.title] = {director:parsed.director};
			res.statusCode = 302;
			res.setHeader('Location', '/movies');
			res.end();
		})
	}
	
}

function handlePutRequest(req,res) {
	var url = req.url;
	if (url == '/movies') { //
		console.log('handlePutRequest');
		var body = '';
		req.on('data', function(chunk) {
			body += chunk;
		});
		req.on('end', function() {
			var parsed = querystring.parse(body);
			parsed.movies = decodeURI(parsed.movies)
			console.log(parsed.movies);
			var obj = JSON.parse(parsed.movies);
			movieList = [];
			movieDetail = {};
			for (var i = 0; i < obj.length; i++) {
				movieList.push(obj[i].title);
				movieDetail[obj[i].title] = {director:obj[i].director};
			}
			res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
			res.end(JSON.stringify({movieList:movieList,movieDetail:movieDetail}));
		})
	} else{
		var itemName = url.split('/')[2];
		itemName = decodeURI(itemName);
		var body = '';
		req.on('data', function(chunk) {
			body += chunk;
		});
		req.on('end', function() {
			var parsed = querystring.parse(body);
			movieDetail[itemName] = {director:parsed.director};
			res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
			res.end(JSON.stringify({movieList:movieList,movieDetail:movieDetail}));
		});
	}
}

function handleDeleteRequest(req,res) {
	var url = req.url;
	if (url == '/movies') { //전체목록삭제
		console.log('all delete');
		movieList = [];
		movieDetail = {};
		res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
		res.end(JSON.stringify(movieList));
	} else{ //개별목록삭제
		console.log(url);
		var itemName = url.split('/')[2];
		itemName = decodeURI(itemName);
		console.log(itemName);
		var item = movieDetail[itemName];
		console.log(item);
		if (item) {
			var index = movieList.indexOf(itemName);
			console.log(index);
			if(index > -1) movieList.slice(index,1);
			delete movieDetail[itemName];
			res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
			res.end(JSON.stringify({movieList:movieList,movieDetail:movieDetail}));
		} else {
			res.statusCode = 404;
			res.end('no item');	
		}
	}
}