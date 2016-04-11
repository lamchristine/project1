var db = require('../models');











// GET all users
function index(req, res) {
  db.User.find(function(err, users) {
    if (err) {
      console.log("Error getting all users");
    } res.json(users);
  });
}


//create user
function create(req, res) {
  console.log("new post received");
  console.log(req.body);

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
  console.log("req.user: ", req.user.id);
  console.log("req.params.id: ", req.params.id);

  if (req.user.id !== req.params.id) {
    return res.sendStatus(401);
  }

  var deletedId = req.params.id;
  console.log(deletedId);

  db.User.findOneAndRemove({_id:deletedId}, function (err, deletedUser){
    res.json(deletedUser);
    console.log(deletedUser);
  });
}

//search for all posts
function search(req, res) {
  var city = req.query.city;
  var country = req.query.country;
  // var cityExp = new RegExp(city, 'i');
  // console.log(cityExp);
  // var countryExp = new RegExp(country, 'i')

  db.User.find ({
    $or:[
        { "trips.city": city },
        { "trips.country": country },
    ]
  }, function (err, foundUsers){
      for (var j=0; j<foundUsers.length; j++) {
        var arr = foundUsers[j].trips;
        for (var i=0; i<arr.length; i++) {
          if ( (arr[i].city === city) || (arr[i].country === country) ) {
            arr = arr[i];
          } foundUsers[j].trips = arr;
        }
      }
      res.json(foundUsers);
    }
  ) //closes db.post
} //closes search function








//export public methods
module.exports = {
  index: index,
  search: search,
  destroy: destroy,
  create: create,
};
