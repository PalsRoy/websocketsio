var express = require('express');
var socket = require('socket.io');


//Invokes express function
var app = express();


var serverport = process.env.PORT || 5000;

//Creating a V8 Javascipt engine running on server port
var server = app.listen(serverport,() => {
  console.log("Server is listening on port "+serverport);
});

// //Route for default path
// app.use('/', (request,response) => {
//   response.send("Hello World App");
// });

app.use(express.static('public'));

//Make the Socket on the backend : Node server
var io = socket(server);

//Invoke a connection between the client and the server.
io.on('connection',(socket) => {
  console.log('made a socket-connection with client '+socket.id);

  //Listening to events triggered from client
  //Broadcast it to all clients connected to server
  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });

  //Listening for the broadacast mesages from a client
  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });

});
