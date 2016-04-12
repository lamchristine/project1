var db = require('../models');

// deleting a trip
function destroy(req, res) {
  if (req.user.id !== req.params.user_id){
    return res.sendStatus(401);
  }
  var tripId = req.params.trip_id;
  var userId = req.params.user_id;
  db.User.findById(userId)
    .exec(function (err, foundUser) {
      if (err) {
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
  if (req.user.id !== req.params.user_id){
    return res.sendStatus(401);
  }
  var userId = req.params.user_id;
  db.User.findById(userId)
    .exec (function (err, foundUser) {
      var newTrip = new db.Trip(req.body);
      foundUser.trips.push(newTrip);
        foundUser.save(function (err, foundUser ) {
          res.json(foundUser);
        });
    });
}

//updating a trip entry
function update(req, res) {
  if (req.user.id !== req.params.user_id){
    return res.sendStatus(401);
  }
  var userId = req.params.user_id;
  var tripId = req.params.trip_id;
  db.User.findById(userId)
    .exec (function (err, foundUser) {
      var foundUserTrips = foundUser.trips.id(tripId);
      foundUserTrips.city = req.body.city;
      foundUserTrips.country = req.body.country;
      foundUserTrips.description = req.body.description;
      foundUserTrips.save(function(err) {
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
