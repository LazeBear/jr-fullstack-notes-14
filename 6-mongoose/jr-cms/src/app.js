require('dotenv').config();
const express = require('express');
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler');
const validationErrorHandler = require('./middleware/validationErrorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(validationErrorHandler);
app.use(errorHandler);

module.exports = app;
