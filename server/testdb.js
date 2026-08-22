const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const DB = process.env.MONGODB_URI;

mongoose
  .connect(DB)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Database connection failed:', err);
  });