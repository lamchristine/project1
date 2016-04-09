var db = require('../models');


// GET all posts
function index(req, res) {
  db.Post.find(function(err, posts) {
    if (err) {
      console.log("Error getting all post");
    } res.json(posts);
  });
}

function destroy(req, res) {
  var deletedId = req.params.id;
  console.log(deletedId);
  db.Post.findOneAndRemove({_id:deletedId}, function (err, deletedPost){
    res.json(deletedPost);
    console.log(deletedPost);
  });
}

//search for all posts
function search(req, res) {
  var city = req.query.city;
  var country = req.query.country;
  // var cityExp = new RegExp(city, 'i');
  // console.log(cityExp);
  // var countryExp = new RegExp(country, 'i')

  db.Post.find ({
    $or:[
        { "trips.city": city },
        { "trips.country": country },
    ]
  }, function (err, foundPosts){
      // console.log(foundPost);

      // var postTrip = foundPost.trips;
      // console.log("posttrip length", foundPosts.length);
      //
      // for (var i=0; i<foundPosts.length; i++) {
      //   for (var j=0; j<foundPosts[i].trips.length; j++) {
      //     if (foundPosts[i].trips[j].city === city) {
      //       foundPosts[i].trips.splice(j,1);
      //       console.log('found posts', foundPosts);
      //     }
      //   }
      // }
      res.json(foundPosts);
      console.log("found post", foundPosts);
    // }
  // );
  }
);
}







//export public methods
module.exports = {
  index: index,
  search: search,
  destroy: destroy,
};
