const Addresses = require('../Models/Addresses');
const { Op } = require('sequelize');
module.exports = {

  async show(req, res) {
    const user_id = req.query.user_id;

    const address = await Addresses.findOne({
      where:{
        user_id:{
          [Op.eq]:user_id
        }
      }
    });
    if (!address) res.status(400).json('id não pertence a um usuário');
    return res.json(address);
  },
}
