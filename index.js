var express = require('express');
var socket = require('socket.io');
const port = process.env.PORT || 3000
// App setup
var app = express();
var server = app.listen(port, function () {
  console.log('listening for requests on port 4000,');
});



// Static files
app.use(express.static('public'));

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});

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







//API for crossword

app.get('/api/crossword', (req, res) => {
  res.send("hello")
})






















