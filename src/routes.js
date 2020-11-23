const express = require('express');
const routes = express.Router();

const usersController = require('./controllers/usersController');


routes.get("/produtos", usersController.index);
routes.get("/estoque-baixo", usersController.buscaBaixoEstq);
routes.get("/busca-id", usersController.buscaId);
routes.get("/busca-nome", usersController.buscaNome);
routes.post("/produtos-filtrados", usersController.buscaFiltros);
routes.post('/produtos/novo', usersController.store);
routes.delete('/produtos/apagar', usersController.delete);
routes.put("/produtos/update", usersController.update);
routes.post("/usuarios/login", usersController.login);
routes.get("/usuarios/busca", usersController.buscaUser);
routes.post("/usuarios/palavraChave", usersController.verificaPalavra);
routes.post('/usuarios/novo', usersController.storeUser);
routes.put("/usuarios/update", usersController.updateUser);


module.exports = routes;