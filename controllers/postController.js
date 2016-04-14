var db = require('../models');

// deleting a post
function destroy(req, res) {
  if (req.user.id !== req.params.user_id){
    return res.sendStatus(401);
  }
  var postId = req.params.post_id;
  var userId = req.params.user_id;
  db.User.findById(userId)
    .exec(function (err, foundUser) {
      if (err) {
      } else {
        var deletedPost = foundUser.posts.id(postId);
        deletedPost.remove();
        foundUser.save();
        res.json(foundUser);
      }
    });
}

//adding a new post
function create(req, res) {
  if (req.user.id !== req.params.user_id){
    return res.sendStatus(401);
  }
  var userId = req.params.user_id;
  db.User.findById(userId)
    .exec (function (err, foundUser) {
      var newPost = new db.Post(req.body);
      foundUser.posts.push(newPost);
        foundUser.save(function (err, foundUser ) {
          res.json(foundUser);
        });
    });
}

//updating a post entry
function update(req, res) {
  if (req.user.id !== req.params.user_id){
    return res.sendStatus(401);
  }
  var userId = req.params.user_id;
  var postId = req.params.post_id;
  db.User.findById(userId)
    .exec (function (err, foundUser) {
      var foundUserPosts = foundUser.posts.id(postId);
      foundUserPosts.city = req.body.city;
      foundUserPosts.country = req.body.country;
      foundUserPosts.description = req.body.description;
      foundUserPosts.save(function(err) {
        if (err) {
        }
      });
      foundUser.save(function(err) {
        res.json(foundUser);
      });
    });
  }

//export public methods
module.exports = {
  create: create,
  destroy: destroy,
  update: update,
};
