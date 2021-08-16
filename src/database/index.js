const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Users = require('../app/Models/Users');
const Addresses = require('../app/Models/Addresses');
const Products = require('../app/Models/Products');

const connection = new Sequelize(dbConfig);

Users.init(connection);
Addresses.init(connection);
Products.init(connection);
Addresses.associate(connection.models);
module.exports = connection;
