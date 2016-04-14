var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema ({
  country: String,
  city: String,
  description: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
