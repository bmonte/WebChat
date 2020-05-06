const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.render('login');
});

routes.get('/chat', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    username: Joi.string().required(),
    room: Joi.string().required()
  })
}), (req, res) => {
  res.render('chat');
});

// Tratamento de erros
routes.get('/404', (req, res, next) => {
  next();
});

// Caso caia numa rota não existente o cliente é redirecionado para a página 404.
routes.use((req, res, next) => {
  res.status(404);

  res.format({
    html: () => {
      res.render('404', { url: req.url })
    }
  });
});

// Redireciona o usuario, após um erro ser lançado, para a página inicial
routes.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.redirect('/');
});

module.exports = routes;