var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Trip = require('./trip');

var PostSchema = new Schema ({
  name: String,
  age: Number,
  image: String, 
  trips: [Trip.schema]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
