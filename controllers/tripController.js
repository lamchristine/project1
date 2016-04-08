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

  db.Post.findById(postId)
    .exec (function (err, foundPost) {
      // var editTrip = foundPost.trips.id(tripId);
      //
      // editTrip = req.body

      var foundPostTrips = foundPost.trips.id(tripId);
      console.log(foundPostTrips)

      foundPostTrips.city = req.body.city;
      foundPostTrips.country = req.body.country;
      foundPostTrips.description = req.body.description;

      foundPostTrips.save(function(err) {
        if (err) {
          console.log("saving edited trip failed");
        }
        res.json(foundPostTrips);
        console.log(foundPostTrips);
      });
    });
  }

  //     foundPostTrips.forEach(function (trip) {
  //       if (foundPostTrips._id === tripId) {
  //         foundPostTrips = req.body;
  //         foundPostTrips.save(function(editedTrip) {
  //           res.json(editedTrip);
  //           console.log(editedTrip);
  //         });
  //       }
  //     });
  //   });
  // }
      // for(var i = 0; i < foundPostTrips.length; i++){
//         if (foundPostTrips[i]._id === tripId) {
//           foundPostTrips[i] = req.body;
//           return foundPostTrips;
//         }
//       }
//       foundPostTrips.save(function(err){
//         if (err) {
//           console.log("edit failed");
//         }
//         console.log("edit trip saved", foundPostTrips);
//         res.json(foundPostTrips);
//       });
//     });
// }



//export public methods
module.exports = {
  create: create,
  destroy: destroy,
  update: update,
};
