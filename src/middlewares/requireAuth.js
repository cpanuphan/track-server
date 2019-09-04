const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.isAuthorized = (req, res, next) => {
  const { authoriztion } = req.headers;

  console.log(authoriztion);

  if (!authoriztion) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authoriztion.replace('Bearer ', '');
  console.log(token);
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};