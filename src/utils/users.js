const users = [];

const userJoin = (id, username, room) => {
  // Cria um usuario
  const user = {id, username, room};
  // Adiciona usuario na array de usuarios conectados
  users.push(user);

  return user;
}

const userLeaves = id => {
  const index = users.findIndex(user => {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getCurrentUser = id => {
  return users.find(user => {
    return user.id === id;
  });
}

const getRoomUsers = room => {
  return users.filter(user => {
    return user.room === room;
  })
}

module.exports = {
  userJoin,
  userLeaves,
  getCurrentUser,
  getRoomUsers
}