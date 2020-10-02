const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const tabelas = require('./bancoConfig');

// tabelas.Logins.sync({force:true});
// tabelas.Produtos.sync({force:true});
module.exports = {

    async index(req, res) {
        const produtos = await tabelas.Produtos.findAll();
        return res.json({ produtos });
    },
    async store(req, res) {
        const produtos = await tabelas.Produtos.create(req.body);

        return res.json(produtos);
    },
    async delete(req, res) {
        const produtos = await tabelas.Produtos.destroy({
            where: {
                'id': req.query.id
            }
        });

        return res.send("apagado com sucesso");
    },
    async update(req, res) {
        const produtos = await tabelas.Produtos.update(req.body, {
            where: {
                id: req.body.id
            }
        });
        return res.json(produtos);

    },
    async verificaPalavra(req, res) {
        const logins = await tabelas.Logins.findAll();
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
        const logins = await tabelas.Logins.findAll();
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
        const logins = await tabelas.Logins.create(req.body)
        return res.json(logins);

    },
    async updateUser(req, res) {
        const logins = await tabelas.Logins.update(req.body, {
            where: {
                id: req.body.id
            }
        }, {
            new: true
        });
        const response = await tabelas.Logins.findAll({
            where: {
                id: req.body.id
            }
        });
        return res.json(response[0]);

    }



}