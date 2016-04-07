var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TripSchema = new Schema ({
  country: String,
  city: String,
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
