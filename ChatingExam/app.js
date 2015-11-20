
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

app.get('/', routes.index);
app.get('/users', user.list);




var server = http.createServer(app);
var socketio = require('socket.io');
var io = socketio.listen(server);
var users = [];

io.sockets.on('connection', function(socket) {
	console.log('connection!!');
	//클라이언트에서 chat_conn이라는 이벤트가 넘어옴
	socket.on('chat_conn',function(raw_msg){
		console.log('chat_conn:' + raw_msg);
		var msg = JSON.parse(raw_msg);
		var index = users.indexOf(msg.chat_id); //사용자 체크
		if (index == -1){
			users.push(msg.chat_id);
			socket.emit('chat_join',JSON.stringify(users)); //접속됫다고 알려줌
			socket.broadcast.emit('chat_join',JSON.stringify(users)); //나머지클라이언트에게도 알려줌
		}else{
			socket.emit('chat_fail',JSON.stringify(msg.chat_id));
		}
	});
	
	socket.on('leave',function(raw_msg){
		console.log('leave:' + raw_msg);
		var msg = JSON.parse(raw_msg);
		if (!!msg.chat_id) {
			var index = users.indexOf(msg);
			users.splice(index, 1);
			socket.emit('someone_leaved',JSON.stringify(users));
			socket.broadcast.emit('someone_leaved',JSON.stringify(users));
		} else {
			
		}
	});
})

io.sockets.on('close', function(socket) {
	console.log('close!!');
})

server.listen(app.get('port'), function() {
	console.log('express start');
})




