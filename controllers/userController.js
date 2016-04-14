var db = require('../models');

// GET all users
function index(req, res) {
  db.User.find(function(err, users) {
    if (err) {
    } res.json(users);
  });
}

//show user profile
function show(req, res) {
  var userId = req.params.id;
  db.User.findById( {_id:userId},function (err, user) {
    if (err) {
    } res.json(user);
  });
}

//create user
function create(req, res) {
  if (req.user) {
    var newUser = new db.User(req.body);
      newUser.save(function (err, savedUser) {
          if (err) {
            res.status(500).json({error: err.message});
          } else {
            res.json(savedUser);
          }
      });
    } else {
      res.sendStatus(401);
    }
}

// delete user
function destroy(req, res) {
  if (req.user.id !== req.params.id) {
    return res.sendStatus(401);
  }
  var deletedId = req.params.id;
  db.User.findOneAndRemove({_id:deletedId}, function (err, deletedUser){
    res.json(deletedUser);
  });
}

//search for all posts
function search(req, res) {
  var q = req.query.search;
  db.User.find ({
    $or:[
        { "posts.city": q },
        { "posts.country": q },
    ]
  }, function (err, foundUsers){
      for (var j=0; j<foundUsers.length; j++) {
        var arr = foundUsers[j].posts;
        for (var i=0; i<arr.length; i++) {
          if ( (arr[i].city === q) || (arr[i].country === q) ) {
            arr = arr[i];
          } foundUsers[j].posts = arr;
        }
      }
      res.json(foundUsers);
    }
  );
}

//export public methods
module.exports = {
  index: index,
  search: search,
  destroy: destroy,
  create: create,
  show: show,
};
