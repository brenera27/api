const express = require('express');
const UsersController = require('./app/controllers/UsersController');
const LoginController = require('./app/controllers/LoginController');
const ProductsController = require('./app/controllers/ProductsController');
const DemandsController = require('./app/controllers/DemandsController');
const AddressController = require('./app/controllers/AddressController');
const routes = express.Router();


//-------- USER -----------
routes.get('/users/id', UsersController.show);
routes.get('/users', UsersController.index);
routes.post('/users', UsersController.store);
routes.put('/users', UsersController.update);
//---------- LOGIN ---------------
routes.post('/login', LoginController.index);

//---------- PRODUCT ------------------
routes.get('/products/id', ProductsController.show);
routes.get('/products/all', ProductsController.showAll);
routes.get('/products', ProductsController.index);
routes.post('/products', ProductsController.store);
routes.put('/products', ProductsController.update);
routes.delete('/products', ProductsController.delete);

//--------------DEMANDS ----------------
routes.get('/demands', DemandsController.index);

//-------------- ADDRESSES ----------------
routes.get('/address/id', AddressController.show);

module.exports = routes;
