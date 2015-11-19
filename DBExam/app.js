
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

//mysql 접속
var mysql = require('mysql');
var dbConfig = {
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'moviest'
};

var connection = mysql.createConnection(dbConfig);
connection.connect(function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('***********mysql start threadId ->' + connection.threadId);
})

//mongo 접속
var mongoClient = require('mongodb').MongoClient;
var mongodb = null; 
mongoClient.connect('mongodb://localhost:27017/moviest',function(err,db){
	if (err) {
		console.log(err);
	}else{
		console.log('**********conneted mongo');
		mongodb = db;
	}
});


app.get('/movies',function(req,res){
	var select = 'select movie_id,title,director,year from movie;';
	connection.query(select,function(err,result){
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			res.render('movie.jade',{title:'✨MOVIES✨',items:result});
		}
	})
});

app.get('/movies/add',function(req,res){
	res.render('add.jade', {title:'💩 Add Movie 💩'});
});

app.get('/movies/:id',function(req,res){
	var select = 'select movie_id,title,director,year from movie where movie_id = ?;';
	connection.query(select,[req.params.id],function(err,result){
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			var movieObj = {};
			if(result.length >0) {
				movieObj = {
							 comments:[]
							,synopsis:''
							,movie_id:result[0].movie_id	
							,title:'✨'+result[0].title+'✨'
							,director:result[0].director	
							,year :result[0].year };
				
				var movie = mongodb.collection('movie');
				movie.find({movie_id:Number(result[0].movie_id)}).toArray(function(err,docs) {
					if (docs.length>0) {
						movieObj.synopsis = docs[0].synopsis;
					}
					var comments = mongodb.collection('comments');
					comments.find({movie_id:Number(result[0].movie_id)}).toArray(function(err,docs) {
						console.log(docs);
						for(var i=0;i<docs.length;i++) movieObj.comments.push({comment:docs[i].comment,comment_id:docs[i]._id});
						res.render('movies.jade',{title:'MOVIES',movie:movieObj});
						console.log(movieObj);
					});
				});
			}
		}
	})
});

app.post('/movies/add',function(req,res){
	var insert = 'insert into movie(title,director,year) ';
	insert += 'values (?,?,?);';
	connection.query(insert,[req.body.title,req.body.director,Number(req.body.year)],function(err,result){
		console.log("insert info : " + JSON.stringify(result));
		
		//몽고삽입
		var movie = mongodb.collection('movie');
		movie.insert({movie_id:result.insertId,synopsis:req.body.synopsis},function (err,result){
			if (err) {
				console.log(err);
			} else {
				console.log("mongo insert info : " + JSON.stringify(result));
				res.redirect('/movies');
			}
		});
		
	});
});


app.post('/movies/comment',function(req,res){
	var comments = mongodb.collection('comments');
	comments.insert({movie_id:Number(req.body.movie_id),comment:req.body.comment},function(err,result){
		if(err){
			console.log(err);
		}else{
			res.redirect('/movies/'+req.body.movie_id);
		}
	});
});

app.get('/movies/update/:id',function(req,res){
	var select = 'select movie_id,title,director,year from movie where movie_id = ?;';
	connection.query(select,[req.params.id],function(err,result){
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			var movieObj = {};
			if(result.length >0) {
				movieObj = {
							 comments:[]
							,synopsis:''
							,movie_id:result[0].movie_id	
							,title:result[0].title
							,director:result[0].director	
							,year :result[0].year };
				
				var movie = mongodb.collection('movie');
				movie.find({movie_id:Number(result[0].movie_id)}).toArray(function(err,docs) {
					if (docs.length>0) {
						movieObj.synopsis = docs[0].synopsis;
					}
					res.render('update.jade',{title:'MOVIES',movie:movieObj});
				});
			}
		}
	})
});

app.put('/movies/:id',function(req,res){
	var update = 'update movie set title = ?,director = ?,year = ? where movie_id = ?;';
	connection.query(update,[req.body.title,req.body.director,req.body.year,req.params.id],function(err,result){
		if (err) {
			console.log(err);
		} else {
			console.log('query');
			console.log(result);
			var movie = mongodb.collection('movie');
//			db.users.update({a:3},{"$set":{temp:10}})
			movie.update({movie_id:Number(req.params.id)},{"$set":{synopsis:req.body.synopsis}},function(err,docs) {
				console.log(docs);
				res.redirect('/movies/'+req.params.id);
			});
		}
	})
});

app.delete('/movies/:id',function(req,res){
	var del = 'delete from movie where movie_id = ?;';
	connection.query(del,[req.params.id],function(err,result){
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			var movie = mongodb.collection('movie');
//			db.users.remove({a:{"$gt":5}})
			movie.remove({movie_id:Number(req.params.id)},function(err,docs) {
				console.log(docs);
				res.redirect('/movies');
			});
		}
	})
});

app.get('/movies/comment/:id',function(req,res){
			var comments = mongodb.collection('comments');
//			db.users.remove({a:{"$gt":5}})
			var ObjectID = require('mongodb').ObjectID;
			comments.remove({_id:new ObjectID(req.params.id)},function(err,docs) {
				console.log(docs);
				res.redirect('/movies/'+req.body.movie_id);
			});
}); 


app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
