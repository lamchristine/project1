  var mongoose = require("mongoose");
  var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var TripSchema = new Schema ({
  country: String,
  city: String,
  description: String,
  timestamps: true,
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
