const User = require('../Models/Users');
const Addresses = require('../Models/Addresses');
const yup = require('yup');
const { Op } = require('sequelize');
module.exports = {


  async show(req, res) {
    const id = req.query.id;
    const user = await User.findOne({
      where:{
        id:{
          [Op.eq]:id
        }
      }
    });
    if (!user) res.status(400).json('id não pertence a um usuário');

    return res.json(user);
  },

  async index(req, res) {
    const { page = 1, name } = req.body;

    const offset = 30 * (page - 1);
    const userFilter = {};

    if (name) {
      userFilter.name = {
        [Op.iLike]:`%${name}%`
      }
    }

    const users = await User.findAll({
      offset,
      limit: 30,
      distinct: true,
      where: userFilter,
    });

      return res.json(users);
    },

  async store(req, res) {
     const schema = yup.object().shape({
      name: yup.string().required('Name obrigatório'),
      email: yup.string().email().required('email obrigatorio'),
      password: yup.string().required('Senha obrigatória'),
      address: yup.object({
        zipcode: yup.string().required('CEP obrigatório'),
        state: yup.string().required('Estado obrigatório'),
        city: yup.string().required('Cidade obrigatória'),
        district: yup.string().required('Bairro obrigatório'),
        street: yup.string().required('Rua obrigatória'),
        number: yup.string().required('Número obrigatório')
      }),
    });

    await schema.validate(req.body).catch(error => {
      res.status(400).json(error.message);
    });
        const user = await User.create(req.body);
        req.body.address.user_id = user.id;

        await Addresses.create(req.body.address);

        return res.json(user);
  },

  async update(req, res) {
    const schema = yup.object().shape({
      id: yup.number().required('ID obrigatório'),
      name: yup.string().required('Name obrigatório'),
      email: yup.string().email().required('email obrigatorio'),
      password: yup.string().required('Senha obrigatória'),
      address:yup.object({
        zipcode:  yup.string().required('Campo Obrigatório.'),
    state: yup.string().required('Campo Obrigatório.'),
    city: yup.string().required('Campo Obrigatório.'),
    district: yup.string().required('Campo Obrigatório.'),
    street: yup.string().required('Campo Obrigatório.'),
    number:yup.string().required('Campo Obrigatório.'),
    complement: yup.string(),
      })
    });

    await schema.validate(req.body).catch(error => {
      res.status(400).json(error.message);
    });
    const {id,name, email, password} = req.body
    const { user_id,zipcode,
    state,
    city,
    district,
    street,
    number,
    complement} = req.body.address

    await User.update(
      {
        name, email, password
      },
       {
        where: {
          id,
        },
      }
    );
    await Addresses.update(
      {
    zipcode,
    state,
    city,
    district,
    street,
    number,
    complement,
      },
       {
        where: {
          user_id:user_id,
        },
      }
    );
    return res.status(201).json("Usuário atualizado com sucesso");
    }

}
