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
      for (var j=0; j<foundPosts.length; j++) {
        var arr = foundPosts[j].trips;
        for (var i=0; i<arr.length; i++) {
          if ( (arr[i].city === city) || (arr[i].country === country) ) {
            arr = arr[i];
          } foundPosts[j].trips = arr;
        }
      }
      res.json(foundPosts);
    }
  ) //closes db.post
} //closes search function








//export public methods
module.exports = {
  index: index,
  search: search,
  destroy: destroy,
};
