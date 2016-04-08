var db = require('../models');


// GET all posts
function index(req, res) {
  db.Post.find(function(err, posts) {
    if (err) {
      console.log("Error getting all post");
    } res.json(posts);
  });
}

// function destroy(req, res) {
//   var deletedId = req.params.id
// }

//export public methods
module.exports = {
  index: index,
  // destroy: destroy,
};
