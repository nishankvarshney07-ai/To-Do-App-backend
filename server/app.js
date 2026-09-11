const express = require('express');
const app = express();
const cors = require('cors');
const errorController = require('./controller/errorController');
const userRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');
app.use(cors());
app.use(express.json());
//app.set('query parser', 'extended');

app.get('/api/v1/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Frontend connected to backend!'
    });
});
app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/users', userRouter);

app.use(errorController.globalErrorHandler);
module.exports = app;