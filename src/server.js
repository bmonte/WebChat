const socketio = require("socket.io");
const http = require("http");
const app = require("./app");

const { userJoin, userLeaves, getCurrentUser, getRoomUsers, } = require("./utils/users");
const formataMensagem = require("./utils/messages");
// Define o nome do bot usado
const botName = "ChatBot";

const server = http.createServer(app);
const io = socketio(server);

// Configurando a porta do servidor
const PORT = 3000 || process.env.PORT;

io.on("connection", socket => {
  socket.on("join chat", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Mensagem de boas vindas
    socket.emit('message', formataMensagem(botName, 'Bem vindo ao ChatApp!'));

    // Mensagem quando usuario conecta
    socket.broadcast
      .to(user.room)
      .emit(
        'message', 
        formataMensagem(botName, `${user.username} acabou de se conectar ao chat!`)
      );
    
    // Envia informações sobre os usuarios na sala
    io.to(user.room).emit('room users', {
      users: getRoomUsers(user.room),
      room: user.room
    });
  });

  socket.on("chat message", msg => {
    const user = getCurrentUser(socket.id);
    // Transmite a mensagem para todos os usuarios na sala
    io.to(user.room).emit('message', formataMensagem(user.username, msg));
  });

  socket.on('disconnect', () => {
    const user = userLeaves(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message', 
        formataMensagem(botName, `${user.username} acabou de sair do chat!`)
      );
    
      // Envia informações sobre os usuarios na sala
      io.to(user.room).emit('room users', {
        users: getRoomUsers(user.room),
        room: user.room
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});