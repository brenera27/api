const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const sequelize = new Sequelize('teste', 'root', '1234567', {
    host: 'localhost',
    dialect: 'mysql'
});
const Produtos = sequelize.define('produtos', {
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
});
const Logins = sequelize.define('logins', {
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
});
// Logins.sync({force:true});
// Produtos.sync({force:true});
module.exports = {
    async index(req, res) {
        const produtos = await Produtos.findAll();

        return res.json(produtos);
    },

    async store(req, res) {
        const produtos = await Produtos.create(req.body);

        return res.json(produtos);
    },
    async delete(req, res) {
        const produtos = await Produtos.destroy({
            where: {
                'id': req.query.id
            }
        });

        return res.send("apagado com sucesso");
    },
    async update(req, res) {
        const produtos = await Produtos.update(req.body, {
            where: {
                id: req.body.id
            }
        });
        return res.json(produtos);

    },
    async verificaPalavra(req, res) {
        const logins = await Logins.findAll();
        for (var login of logins) {
            if (login.email === req.body.email) {
                if (login.palavraChave === req.body.palavraChave) {
                    return res.json({
                        token: jwt.sign({
                            email: login.email
                        }, 'meusegredo'),
                        "id": login.id
                    });
                } else {
                    return res.json({
                        "mensagem": "Palavra chave inválida"
                    });
                }
            }

        }

    },

    async login(req, res) {
        const logins = await Logins.findAll();
        for (var login of logins) {
            if (login.email === req.body.email) {
                if (login.senha === req.body.senha) {
                    return res.json({
                        token: jwt.sign({
                            email: login.email
                        }, 'meusegredo'),
                        user: login
                    });
                } else {
                    return res.json({
                        "mensagem": "Senha inválida",
                    });
                }
            }

        }
        return res.json({
            "mensagem": "Email inválido"
        });


    },
    async storeUser(req, res) {
        const logins = await Logins.create(req.body);
        return res.json(logins);
    },
    async updateUser(req, res) {
        const logins = await Logins.update(req.body, {
            where: {
                id: req.body.id
            }
        }, {
            new: true
        });
        const response = await Logins.findAll({
            where: {
                id: req.body.id
            }
        });
        return res.json(response[0]);

    }



}