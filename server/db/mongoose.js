var mongoose = require('mongoose');
const path = require('path');

mongoose.Promise = global.Promise;

require('dotenv').config({path: './../../variables.env'});

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true }
);

module.exports = {mongoose};
