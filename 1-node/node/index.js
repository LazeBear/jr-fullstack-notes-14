const { increaseCount } = require('./counter.js');
const { getMsg } = require('./msg');

increaseCount();
console.log(getMsg());

// index.js, app.js, server.js