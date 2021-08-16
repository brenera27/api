const Product = require('../Models/Products');
const { QueryTypes } = require('sequelize');
const yup = require('yup');

module.exports = {

  async showAll(req, res) {
    const product = await Product.findAll();
    return res.json(product);
  },

  async show(req, res) {
    const id = req.query.id;
    const product = await Product.findByPk(id);
    if (!product) res.status(400).json('id não pertence a um produto');

    return res.json(product);
  },

  async index(req, res) {
    const {page = 1, name='',types, rangePrice, rangeInventory, min_inventory = false, } = req.query;
    const offset = 10 * (page - 1);

    const filterType = types ? `and p.type in (${types})` : '';
    const filterPrice = rangePrice ? `and p.price between ${rangePrice[0]} and ${rangePrice[1]}` : '';
    const filterInventory = rangeInventory ? `and p.inventory between ${rangeInventory[0]} and ${rangeInventory[1]}` : '';
    const filterMinInventory = min_inventory === 'true' ? `and p.inventory < p.min_inventory` : '';

    const queryProducts = `
    select * from products p
    where p."name" ilike '%${name}%'
    ${filterType}
    ${filterPrice}
    ${filterInventory}
    ${filterMinInventory}
    ORDER BY p.id asc
    LIMIT 10
    OFFSET ${offset}
    `;

    const products = await Product.sequelize.query(queryProducts, {
      type: QueryTypes.SELECT,
    });

    const queryTotal = `
    select count(*) from products p
    where p."name" ilike '%${name}%'
    ${filterType}
    ${filterPrice}
    ${filterInventory}
    ${filterMinInventory}
    `;

    const totalProducts = await Product.sequelize.query(queryTotal, {
      type: QueryTypes.SELECT,
    });

    return res.json({
      products,
      amount: totalProducts[0].count
    });
    },

  async store(req, res) {
      const schema = yup.object().shape({
      name: yup.string().required('Name obrigatório'),
      type: yup.string().required('email obrigatorio'),
      inventory: yup.number().required('Estoque obrigatório'),
      min_inventory: yup.number().required('Estoque mínimo obrigatório'),
      price: yup.number().required('Preço obrigatório'),
    });

    await schema.validate(req.body).catch(error => {
      res.status(400).json(error.message);
    });

    const product = await Product.create(req.body);

    return res.status(201).json(product);
  },

  async update(req, res) {
    const schema = yup.object().shape({
      id: yup.number().required('ID obrigatório'),
      name: yup.string().required('Name obrigatório'),
      type: yup.string().required('email obrigatorio'),
      inventory: yup.number().required('Estoque obrigatório'),
      min_inventory: yup.number().required('Estoque mínimo obrigatório'),
      price: yup.number().required('Preço obrigatório'),
    });

    await schema.validate(req.body).catch(error => {
      res.status(400).json(error.message);
    });
    const {id,name, type, price, inventory, min_inventory} = req.body

    await Product.update(
      {
        name, type, price, inventory, min_inventory
      },
       {
        where: {
          id,
        },
      }
    );
    return res.status(201).json("Produto atualizado com sucesso");
  },

  async delete(req, res) {
    const id = req.query.id;
    const product = await Product.findByPk(id);
    if (!product) res.status(400).json('id não pertence a um produto');

    await Product.destroy({
      where: {
        id,
      },
    });

    return res.json({ message: 'Produto deletado com sucesso' });
  }

}
