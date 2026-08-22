const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
dotenv.config();


const DB = process.env.MONGODB_URI;

mongoose
    .connect(DB)
    .then(() => {
        console.log('Database connected Succesfully');

        app.listen(3000, () => {
            console.log("server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log('data base connection failed succesfully', err);
    });



