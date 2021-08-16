const Product = require('../Models/Products');
const { QueryTypes } = require('sequelize');
const yup = require('yup');

module.exports = {

  async index(req, res) {

    const queryDados = `
    select * from products p
    where p.inventory < p.min_inventory
    ORDER BY p.id asc
    `;

    const products = await Product.sequelize.query(queryDados, {
      type: QueryTypes.SELECT,
    });

    return res.json(products);
    },
}
