const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const tabelas = require('./bancoConfig');

// tabelas.Logins.sync({force:true});
// tabelas.Produtos.sync({force:true});
module.exports = {

    async index(req, res) {
        const produtos = await tabelas.Produtos.findAll()
        return res.json({ produtos })
    },

    async buscaId(req, res) {
        let produto = await tabelas.Produtos.findAll({
            where:{
                id : req.query.id
            }
        })
        produto = produto[0]
        return res.json({ produto })
    },

    async buscaNome(req, res) {
        let produto = await tabelas.Produtos.findAll({
            where:{
                nome : req.query.nome
            }
        })
        produto = produto[0]
        return produto != null ?  res.json({ produto }) :  res.json( "Produto não encontrado" )
        
    },

    async buscaFiltros(req, res) {
        const filtros = req.body.filtros
        let estqBaixo = false
        const produtos = await tabelas.Produtos.findAll()
        let filtrados = []
        let qtdFiltros = 0
        filtros.map(async (filtro) => {
            qtdFiltros++
            if (filtro == 'estoque-baixo') {
                estqBaixo = true
            }

            if (filtro == 'alimento') {
                produtos.map((produto) => {
                    if (produto.tipo == 'Alimento') {
                        filtrados.push(produto)
                    }
                })
            }
            if (filtro == 'bebida') {
                produtos.map((produto) => {
                    if (produto.tipo == 'Bebida') {
                        filtrados.push(produto)
                    }
                })
            }
            if (filtro == 'ferramenta') {
                produtos.map((produto) => {
                    if (produto.tipo == 'Ferramenta') {
                        filtrados.push(produto)
                    }
                })
            }
            if (filtro == 'brinquedo') {
                produtos.map((produto) => {
                    if (produto.tipo == 'Brinquedo') {
                        filtrados.push(produto)
                    }
                })
            }
            if (filtro == 'roupa') {
                produtos.map((produto) => {
                    if (produto.tipo == 'Roupa') {
                        filtrados.push(produto)
                    }
                })
            }
        })
        const resposta = [];
        if(estqBaixo == true){
            if(qtdFiltros == 1){
                produtos.map((produto)=>{
                    if(produto.estoque < produto.estoqueMin){
                        resposta.push(produto)
                    }
                })
            }else{
                filtrados.map((produto)=>{
                    if(produto.estoque < produto.estoqueMin){
                        resposta.push(produto)
                    }
                })
            } 
        }else{
            return res.json({ "produtos":filtrados });
        }

        return res.json({ "produtos":resposta });
    },

    async buscaBaixoEstq(req, res) {
        const produtos = await tabelas.Produtos.findAll();
        let total = 0;
        const filtrados = []
        produtos.map((produto) => {
            if (produto.estoque < produto.estoqueMin) {
                total++;
                filtrados.push(produto);
            }
        })
        return res.json({
            "produtos": filtrados,
            "total": total
        });
    },

    async store(req, res) {
        const produtos = await tabelas.Produtos.create(req.body.produto);

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
        const produtos = await tabelas.Produtos.update(req.body.produto, {
            where: {
                id: req.body.produto.id
            }
        });
        return res.json(produtos);

    },

    async verificaPalavra(req, res) {
        const {email, palavraChave} = req.body
        const logins = await tabelas.Logins.findAll();
        logins.map((login)=>{
            if (login.email === email) {
                if (login.palavraChave === palavraChave) {
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
        })
    },

    async login(req, res) {
        const logins = await tabelas.Logins.findAll();
        logins.map((login)=>{
            if (login.email === req.body.email) {
                if (login.senha === req.body.senha) {
                    return res.json({
                        token: jwt.sign({
                            email: login.email
                        }, 'meusegredo'),
                        id: login.id
                    });
                } else {
                    return res.json({
                        "mensagem": "Senha inválida",
                    });
                }
            }
        })
        return res.json({
            "mensagem": "Email inválido"
        });
    },

    async buscaUser(req, res) {
        let usuario = await tabelas.Logins.findAll({
            where:{
                id : req.query.id
            }
        })
        usuario = usuario[0]
        return res.json({ usuario })
    },
    
    async storeUser(req, res) {
        
         const pessoa = await tabelas.Logins.create(req.body.pessoa)
         return res.json(pessoa);

    },

    async updateUser(req, res) {
        const logins = await tabelas.Logins.update(req.body.pessoa, {
            where: {
                id: req.body.pessoa.id
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