var mongoose = require('mongoose');
const path = require('path');

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

module.exports = {mongoose};
