const moment = require('moment');

// Função que formata a mensagem enviada em um objeto contendo usuario, mensagem e hora.
const formataMensagem = (username, text) => {
  return {
    username: username,
    text: text,
    time: moment().format('HH:mm')
  }
}

module.exports = formataMensagem;