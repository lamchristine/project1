var db = require('../models');

// deleting a trip
function destroy(req, res) {
  var tripId = req.params.trip_id;
  console.log("deleted trip id ", tripId);
  var userId = req.params.user_id;
  console.log("found user id", userId);

  db.User.findById(userId)
    .exec(function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        var deletedTrip = foundUser.trips.id(tripId);
        deletedTrip.remove();
        foundUser.save();
        res.json(foundUser);
      }
    });
}


//adding a new trip
function create(req, res) {
  var userId = req.params.user_id;
  db.User.findById(userId)
    .exec (function (err, foundUser) {
      var newTrip = new db.Trip(req.body);
      foundUser.trips.push(newTrip);
        foundUser.save(function (err, foundUser ) {
          console.log("new trip created", foundUser);
          res.json(foundUser);
        });
    });
}


//updating a trip entry
function update(req, res) {
  var userId = req.params.user_id;
  var tripId = req.params.trip_id;
  console.log(tripId);

  db.User.findById(userId) //find the post that needs to be updated
    .exec (function (err, foundUser) {

      var foundUserTrips = foundUser.trips.id(tripId);
      console.log(foundUserTrips);

      foundUserTrips.city = req.body.city;
      foundUserTrips.country = req.body.country;
      foundUserTrips.description = req.body.description;

      foundUserTrips.save(function(err) {
        if (err) {
          console.log("saving edited trip failed");
        }
        console.log(foundUserTrips);  //only saves the one edited trip
      });
      foundUser.save(function(err) { //saves the entire pose with the edited trip
        res.json(foundUser);
        console.log(foundUser);
      });
    });
  }


//export public methods
module.exports = {
  create: create,
  destroy: destroy,
  update: update,
};
