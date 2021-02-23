var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
var users = [];
io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', function (data) {
    // console.log(data);
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

  //code-share
  socket.on('username', function (data) {
    users.push(data);
    io.sockets.emit('username-new', users);
  });

  //html sync
  socket.on('xml', function (data) {
    socket.broadcast.emit('xml-data', data);
  });

  //css sync
  socket.on('css', function (data) {
    socket.broadcast.emit('css-data', data);
  });

  //javascript sync
  socket.on('javascript', function (data) {
    socket.broadcast.emit('javascript-data', data);
  });

  //message
  socket.on('code-share-message-to-server', function (data) {
    socket.broadcast.emit('code-share-message', data);
  });

});