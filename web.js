var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var socket = require('socket.io');

app.configure(function () {
	app.use("/", express.static(__dirname));
});
var io = socket.listen(app.listen(port));
var connections = [];
io.sockets.on('connection', function (socket) {
	socket.emit('history', []);
	socket.on('newMessage', function (message) {
		connections.forEach(function (oldSocket) {
			oldSocket.emit('newMessage', message);
		});
	});
	connections.push(socket);
});
console.log("Express server running on http://localhost:" + port);