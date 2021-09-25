const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function addUser(req, res, next) {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username }).exec();
  if (existingUser) {
    return res.sendStatus(409);
  }
  const user = new User({
    username,
    password,
  });

  await user.hashPassword();
  await user.save();

  const token = generateToken({ id: user._id });
  return res.json({ token, username });
}

module.exports = { addUser };
