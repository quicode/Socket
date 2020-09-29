var socket = io.connect('https://iotservice.azurewebsites.net/', { 'forceNew': true });
//var socket = io.connect('http://192.168.10.55:8080', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
})

function render (data) {
 var html = data.map(function(elem, index) {
    return(`<div>
              <strong>Usuario: ${elem.user}</strong>:
              <em>Latitud: ${elem.latitud}</em>
              <em>Longitud: ${elem.longitud}</em>
              <em>Fecha/Hora: ${elem.date}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}