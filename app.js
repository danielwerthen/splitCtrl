
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
	, _ = require('underscore')
	, sio = require('socket.io')
	, engine = require('./engine')

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/display', function (req, res) {
	return res.render('display');
});

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = sio.listen(server);
io.configure(function () { 
	io.set('log level', 1);
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
var ids = 0;
var play = io
	.of('/player')
	.on('connection', function (socket) {
		var id = ids++;
		socket.on('update', function (force) {
			engine.setForce(id, force);
		});
		socket.on('disconnect', function () {
			ids--;
		});
});

var disp = io
	.of('/display')
	.on('connection', function (socket) {
});


var inty = 105;
setInterval(function () {
	var data = engine.update(inty / 1000);
	data.interval = inty;
	_.each(disp.sockets, function (socket) {
		socket.emit('update', data);
	});
}, inty);

console.log('running');
