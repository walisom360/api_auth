const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { promisify } = require('util');

//verifica os headers passados
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not Provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id; //informÃ£Ã§Ã£o de qual usuario esta logado
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
