const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./route/authRoutes');

const app = express();

app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:u4806132@cluster0-7c63r.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo Instance');
});
mongoose.connection.on('error', () => {
  console.error('Error connecting to Mongo', err);
});

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
