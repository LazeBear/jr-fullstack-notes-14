const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 'xxxx' }, 'secret', { expiresIn: '1s' });
// access token
// refresh token

console.log(token);
