const messageHistory = [];

const insertMessage = (message) => {
  if (messageHistory.length <= 100) {
    messageHistory.push(message);
  } else {
    messageHistory.shift()
    messageHistory.push(message);
  }
}

const getHistory = () => {
  return messageHistory;
}

module.exports = { insertMessage, getHistory };