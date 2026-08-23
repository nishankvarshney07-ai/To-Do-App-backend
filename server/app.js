const express = require('express');
const app = express();
const errorController = require('./controller/errorController');
const userRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');
app.use(express.json());
//app.set('query parser', 'extended');

app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/users', userRouter);

app.use(errorController.globalErrorHandler);
module.exports = app;