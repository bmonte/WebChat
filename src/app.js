const express = require('express');
const { errors } = require('celebrate');
const path = require('path');
const routes = require('./routes');

const app = express();
app.disable('x-powered-by');

// Configurando a pasta estatica
app.use(express.static(path.join(__dirname, 'assets')));

// Configurando o view engine do projeto
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(routes);
app.use(errors());

module.exports = app;