const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cellphone Store API',
    description: 'Documentation',
  },
  host: 'https://cellphones-backend-sooty.vercel.app/',
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['src/api.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
