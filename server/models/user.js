var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema way
var userSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    age: {
      type: Number,
      required: true
    }
  });
  var User = mongoose.model('User', userSchema);

  module.exports = {User}