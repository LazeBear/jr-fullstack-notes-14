const jwt = require('jsonwebtoken');

// const token = jwt.sign({ id: 'xxxx' }, 'secret1', { expiresIn: '1d' });
// access token
// refresh token

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Inh4eHgiLCJpYXQiOjE2MzI1NjExMDQsImV4cCI6MTYzMjU2MTEwNX0.1WumsansgnBWHH6h9Zu864Tfuo77vwXg2Iz55ATth_A';

const decoded = jwt.verify(token, 'secret');

console.log(decoded);
