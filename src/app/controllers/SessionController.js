const User = require('../models/User');
const { string, object } = require('yup');

class SessionController {
  async store(req, res) {
    
    const schema = object().shape({
      email: string().email().required(),
      password: string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Email e senha obrigatÃ³rios' })
    }
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    return res.json({ user, token: User.generateToken(user) });
  }
}

module.exports = new SessionController();
