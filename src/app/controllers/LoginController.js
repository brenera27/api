const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const yup = require('yup');
module.exports = {

  async index(req, res) {
     const schema = yup.object().shape({
     email: yup.string().email().required('email obrigatorio'),
     password: yup.string().required('Senha obrigatória'),
    });

    await schema.validate(req.body).catch(error => {
      res.status(400).json(error.message);
    });

    const { email, password } = req.body;

    const login = await User.findOne({
      where: {
        email,
      },
    })
    if (login) {
      if (login.password === password) {
        return res.json({
          token: jwt.sign({
            email: login.email
          }, 'token'),
          id: login.id
        });
      } else {
         return res.json({"error":'Senha incorreta'});
      }
    } else {
      return res.json({"error":'Usuário não encontrado'});
    }

    }

}
