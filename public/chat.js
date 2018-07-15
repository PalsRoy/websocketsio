var socket = io.connect("http://localhost:5000");

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var output = document.getElementById("output");
var btn = document.getElementById("send");
var feedback = document.getElementById("feedback");

//Emit evenets from client browser
btn.addEventListener('click',function(){
  socket.emit('chat',{
    handle: handle.value,
    message: message.value
   });
});

message.addEventListener('keypress',function(){
  socket.emit('typing',handle.value);
});


//Listen to evenets
socket.on('chat',function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>'+ data.handle +' : </strong>'+ data.message +'</strong></p>';

});

socket.on('typing',function(data){
  feedback.innerHTML = '<p><em>'+ data + ' is typing </em></p>';
});
