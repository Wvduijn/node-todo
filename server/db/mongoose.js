var mongoose = require('mongoose');
const path = require('path');

mongoose.Promise = global.Promise;

const MONGODB_URI = 'mongodb://pixelbender:PixelBender1@ds141720.mlab.com:41720/todoappnode';

mongoose.connect(
  MONGODB_URI || 'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true }
);

module.exports = {mongoose};
