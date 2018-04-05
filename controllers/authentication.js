const jwt = require('jwt-simple');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};
