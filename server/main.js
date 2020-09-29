var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);
function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
var messages = [{
  id: 1,
  user: "Servidor",
  text: "Hola soy un mensaje",
  latitud:"",
  longitud:"",
  date: "IoT"
}];

app.use(express.static('public'));

app.get('/hello', function(req, res) {
  res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    console.log(data);
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
  socket.on('message', function(data) {
    messages.push(data);
    console.log(data);
  });
  
});

server.listen(port, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});