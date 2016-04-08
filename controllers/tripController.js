var db = require('../models');

function destroy(req, res) {
  var tripId = req.params.trip_id;
  console.log("deleted trip id ", tripId);
  var postId = req.params.post_id;
  console.log("found post id", postId);

  db.Post.findById(postId)
    .exec(function (err, foundPost) {
      if (err) {
        console.log(err);
      } else {
        var deletedTrip = foundPost.trips.id(tripId);
        deletedTrip.remove();
        foundPost.save();
        res.json(foundPost);
      }
    });
}

function create(req, res) {
  var postId = req.params.post_id;
  db.Post.findById(postId)
    .exec (function (err, foundPost) {
      var newTrip = new db.Trip(req.body);
      foundPost.trips.push(newTrip);
        foundPost.save(function (err, foundPost ) {
          console.log("new trip created", foundPost);
          res.json(foundPost);
        });
    });
}

//export public methods
module.exports = {
  create: create,
  destroy: destroy,
};
