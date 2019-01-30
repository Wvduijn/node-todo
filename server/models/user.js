const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
// Schema way
const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    age: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  });
  var User = mongoose.model('User', userSchema);

  module.exports = {User}