const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, JWT_KEY, { expiresIn: '1d' });
}

function validateToken(token) {
  // return jwt.verify(token, JWT_KEY);
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (e) {
    return null;
  }
}

module.exports = { generateToken, validateToken };
