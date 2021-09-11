const swaggerJsdoc = require('swagger-jsdoc');

module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JR tasks api',
      version: '1.0.0',
      contact: {
        name: 'mason',
        email: 'exmaple.com',
      },
    },
  },
  apis: ['src/controllers/*.js'],
});
