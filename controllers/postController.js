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

function search(req, res) {
  var q = req.query;
  console.log(q);
  var qExp = new RegExp(q);
  console.log("qexpression", qExp);
  output = [];
  db.Post.findOne( {"trip.city": qExp.city, "trip.country": qExp.country }, function (err, foundPost){
    res.json(foundPost);
    console.log("found post", foundPost);
    // res.sendStatus(200)
  });
}
  // posts.forEach(function(td) {
  //     if(td.city.match(qExp) || td.country.match(qExp)) {
  //       output.push(td);
  //     }
  //   });





//export public methods
module.exports = {
  index: index,
  search: search,
  destroy: destroy,
};
