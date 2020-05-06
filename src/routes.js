const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.render('login');
});

routes.get('/chat', (req, res) => {
  res.render('chat');
});

module.exports = routes;