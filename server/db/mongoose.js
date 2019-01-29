var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config({path: './../../variables.env'});

mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true }
);

module.exports = {mongoose};
