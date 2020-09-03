const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const sequelize = new Sequelize('teste', 'root', '1234567', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
module.exports = {
Produtos : sequelize.define('produtos', {
    nome: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.STRING
    },
    estoque: {
        type: Sequelize.DOUBLE
    },
    preco: {
        type: Sequelize.DOUBLE
    }
}),
 Logins : sequelize.define('logins', {
    nome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    },
    palavraChave: {
        type: Sequelize.STRING
    },
    dataNascimento: {
        type: Sequelize.DATE
    },
    cep: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },
    cidade: {
        type: Sequelize.STRING
    },
    bairro: {
        type: Sequelize.STRING
    },
    rua: {
        type: Sequelize.STRING
    },
    numero: {
        type: Sequelize.STRING
    },
    complemento: {
        type: Sequelize.STRING
    }
})

}