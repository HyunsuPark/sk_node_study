
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
///////////////////////////////////////////////////////

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

//검색
app.get('/movies', function(req,res) {
	console.log(movieList);
	console.log(movieDetail);
	
	res.render('movies.jade',{title:'movie list',items:movieList});
});

app.get('/movies/:name', function(req,res) {
	var name = req.params.name;
	var title = movieDetail[name];
	if (title) {
		res.render('movie.jade',{title:name,director:title.director,actor:title.actor});
	} else {
		res.statusCode = 404;
		res.json({error:'noname'});
		res.end();
	}
});

//추가
app.post('/movies', function(req,res,next) {
	var name = req.body.name;
	var director = req.body.director;
	var actor = req.body.actor;
	movieList.push(name);
	movieDetail[name] = {director:director,actor:actor};
	res.redirect('/movies');
});

app.post('/movies/:name', function(req,res,next) {
	var name = req.params.name;
	var director = req.body.director;
	var actor = req.body.actor;
	movieList.push(name);
	movieDetail[name] = {director:director,actor:actor};
	res.redirect('/movies');
});

app.delete('/movies', function(req,res,next) { 
	movieList = [];
	movieDetail = {};
	res.redirect('/movies');
});

app.delete('/movies/:name', function(req,res,next) {
	var itemName = req.params.name;
	itemName = decodeURI(itemName);
	console.log(itemName);
	var item = movieDetail[itemName];
	console.log(item);
	if (item) {
		var index = movieList.indexOf(itemName);
		console.log(index);
		if(index > -1) movieList.splice(index,1);
		delete movieDetail[itemName];
		res.redirect('/movies');
	} else {
		res.statusCode = 404;
		res.send('no item');	
	}
});

app.put('/movies', function(req,res,next) {
	console.log('ㅔㅕㅅㅅㅅ');
	console.log(req.body.movies);
	var obj = JSON.parse(req.body.movies);
	movieList = [];
	movieDetail = {};
	for (var i = 0; i < obj.length; i++) {
		movieList.push(obj[i].title);
		movieDetail[obj[i].title] = {director:obj[i].directive,actor:obj[i].actor};
	}
	res.redirect('/movies');
});

app.put('/movies/:name', function(req,res,next) {
	console.log('put');
	var name = req.params.name;
	if(!movieDetail[name]) movieList.push(name);
	movieDetail[name] = {director:req.body.director,actor:req.body.actor};
	res.redirect('/movies');
});

app.use(function(err,req,res,next) {
	console.log(err);
})



function handleGetRequest(req,res) {
	
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
