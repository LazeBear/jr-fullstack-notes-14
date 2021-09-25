const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function login(req, res, next) {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username }).exec();
  if (!existingUser) {
    // {error: "xxxxx"}
    return res.status(401).json('invalid username or password');
  }
  const validPassword = await existingUser.validatePassword(password);
  if (!validPassword) {
    return res.status(401).json('invalid username or password');
  }

  const token = generateToken({ id: existingUser._id });
  return res.json({ token });
}

module.exports = { login };
