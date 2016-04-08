var db = require('../models');

// deleting a trip
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


//adding a new trip
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


//updating a trip entry
function update(req, res) {
  var postId = req.params.post_id;
  var tripId = req.params.trip_id;
  console.log(tripId);

  db.Post.findById(postId) //find the post that needs to be updated
    .exec (function (err, foundPost) {

      var foundPostTrips = foundPost.trips.id(tripId);
      console.log(foundPostTrips);

      foundPostTrips.city = req.body.city;
      foundPostTrips.country = req.body.country;
      foundPostTrips.description = req.body.description;

      foundPostTrips.save(function(err) {
        if (err) {
          console.log("saving edited trip failed");
        }
        console.log(foundPostTrips);  //only saves the one edited trip
      });
      foundPost.save(function(err) { //saves the entire pose with the edited trip
        res.json(foundPost);
        console.log(foundPost);
      });
    });
  }


  //search all posts
  // function search(req, res) {
  //   var q = req.query.q;
  //   console.log(q);
  //   var qExp = new RegExp(q);
  //   output = [];
  //   posts.forEach(function(post) {
  //     post.trips.forEach(function(td) {
  //       if(td.city.match(qExp) || td.country.match(qExp)) {
  //         output.push(td);
  //       }
  //     });
  //   });
  // }


//export public methods
module.exports = {
  create: create,
  destroy: destroy,
  update: update,
  // search: search,
};
