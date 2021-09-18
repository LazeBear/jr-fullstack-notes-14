const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const connectToDB = require('./utils/db');

const app = express();

app.use(express.json());

app.use('/api', routes);

connectToDB();

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
