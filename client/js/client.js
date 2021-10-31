var stompClient = null;
var serverAddress = 'http://localhost:8080/';

function connect() {
  var socket = new SockJS(`${serverAddress}/chat`);
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => { 
    setConnected(true);
    stompClient.subscribe('/topico/mensagens', (messageOutput) => {	  
      showMessageOutput(JSON.parse(messageOutput.body));          
    });  
  });
}

function showMessageOutput(messageOutput) {
  var response = document.getElementById('resposta');
  var p = document.createElement('p');
  p.style.wordWrap = 'break-word';
  p.appendChild(document.createTextNode(messageOutput.origin + ": " +
                messageOutput.text + " (" + messageOutput.time + ")"));
  response.appendChild(p);
}

function disconnect() {
  if (stompClient != null) {
    stompClient.disconnect();
  }
  setConnected(false);
}

function enviarMsg() {
  var origin = document.getElementById('origin').value;
  var text = document.getElementById('text').value;
  stompClient.send('/app/chat', {}, JSON.stringify({'origin': origin, 'text': 
                    text})); 
}

function setConnected(connected) {
  document.getElementById('connect').disabled = connected;
  document.getElementById('disconnect').disabled = !connected;
  document.getElementById('divConversa').style.visibility = connected ? 'visible' : 'hidden';
  document.getElementById('resposta').innerHTML = '';
}