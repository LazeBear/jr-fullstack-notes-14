require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const logger = require('./utils/logger');

const router = require('./routes');
const swaggerDoc = require('./utils/swagger');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(helmet());
app.use(
  process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev')
);
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// GET /api/tasks
// console.log(process.env.NODE_ENV);
// api.example.com/tasks
app.use('/api', router);
// app.use('/v2', router2);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}...`);
});

// blocking
// non-blocking

// error
// warning
// info
// debug
