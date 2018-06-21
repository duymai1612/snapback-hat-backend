var mongoose = require('mongoose');
var Bcrypt = require('mongoose-bcrypt');
var moment = require('moment');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: { type: String },
  avatar: {
    type: String,
  },
  username: { 
    type: String, 
    required: [true, "Username is required"],
    minlength: [6, "Username is at least 6 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password is at least 6 characters"],
    bcrypt: true
  }
});

UserSchema.plugin(Bcrypt);

module.exports = mongoose.model('UserInfo', UserSchema);
