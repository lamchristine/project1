var db = require('../models');


// function create(req, res) {
//   var new_user = new User({ username: req.body.username });
//   db.User.register(new_user, req.body.password,
//     function (err, newUser) {
//       passport.authenticate('local')(req, res, function() { //attach cookie to user
//         res.redirect('/'); //redirect to homepage once signed up!!!! do not render
//       });
//     }
//   );
// }


//export public methods
module.exports = {
  // create: create
  // index: index,
  // search: search,
  // destroy: destroy,
};
