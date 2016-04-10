//require mongoose and passport-local-mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Trip = require('./trip');

//define user schema
var UserSchema = new Schema({
  username: String,
  password: String,
  trips: [Trip.schema]
});

//plugin takes care of hashing and salting the user's plain text password
UserSchema.plugin(passportLocalMongoose);

//create user model and export it
var User = mongoose.model('User', UserSchema);
module.exports = User;
