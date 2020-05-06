const $chatForm = document.getElementById('chat-form');
const $chatMessages = document.getElementsByClassName('chat-messages')[0];
const $roomName = document.getElementById('room-name');
const $usersList = document.getElementById('users');

const socket = io('/chat');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

socket.emit("join chat", { username, room });

socket.on('room users', ({users, room}) => {
  outputRoomName(room);
  outputUsersList(users);
});

socket.on("message", (msg) => {
  console.log(msg);
  outputMessage(msg);

  // Scroll down
  $chatMessages.scrollTop = $chatMessages.scrollHeight;
});

$chatForm.addEventListener("submit", event => {
  event.preventDefault();

  // Pega a mensagem
  const msg = event.target.elements.msg.value;

  socket.emit("chat message", msg);

  limparCampoDeMensagem(event);
});

// Limpa o campo de mensagem
function limparCampoDeMensagem(event) {
  event.target.elements.msg.value = '';
  event.target.elements.msg.focus();
}

// Coloca a mensagem na DOM
function outputMessage(message) {
  const $div = document.createElement('div');
  $div.classList.add("message");
  $div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">${message.text}</p>`;
  $chatMessages.appendChild($div);
}

// Coloca o nome da sala na DOM
function outputRoomName(room) {
  $roomName.innerText = room;
}

// Coloca a lista de usuarios na DOM
function outputUsersList(users) {
  $usersList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}