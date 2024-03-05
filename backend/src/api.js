require('express-async-errors');
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const cellphoneRouter = require('./routes/cellphoneRouter');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

app.use('/phone', cellphoneRouter);

app.use(errorMiddleware);

module.exports = app;
