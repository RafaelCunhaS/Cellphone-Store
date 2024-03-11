require('express-async-errors');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const userRouter = require('./routes/userRouter');
const cellphoneRouter = require('./routes/cellphoneRouter');
const errorMiddleware = require('./middlewares/error');
const swaggerDocs = require('../swagger_output.json');

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';
const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

app.use('/cellphone', cellphoneRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }));

app.use(errorMiddleware);

module.exports = app;
