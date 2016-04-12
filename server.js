var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var controllers = require('./controllers');

var db = require('./models');
var User = db.User;


// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey', // change this!
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.use('/vendor', express.static(__dirname + '/bower_components'));

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true}));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */


 // app.get('/', function homepage (req, res) {
 //   res.sendFile(__dirname + '/views/index.html');
 // });
 // app.get('/posts', function homepage (req, res) {
 //   res.sendFile(__dirname + '/views/post.html');
 // });

 app.get('/', function (req, res) {
     res.render('index', {user: JSON.stringify(req.user) + " || null"});
 });

 app.get('/posts', function (req, res) {
     res.render('user', {user: JSON.stringify(req.user) + " || null"});
 });

 //signup form
  app.get('/signup', function (req, res) {
    if (req.user) {
      return res.redirect('/');
    }
    res.render('signup');
 });

//show login view
app.get('/login', function (req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('login'); // you can also use res.sendFile
});


/*
 * AUTH ROUTES
 */

 // sign up new user, then log them in , hashes and salts password, saves new user to db
 app.post('/signup', function singup (req, res) {
   db.User.register(new User({ username: req.body.username, age: req.body.age, blurb: req.body.blurb, image: req.body.image}), req.body.password,
     function (err, newUser) {
       passport.authenticate('local')(req, res, function() {
         // res.send('signed up!!!');
         res.redirect('/posts');
       });
     }
   );
 });


// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log( req.user);
  // res.send('logged in!!!'); // sanity check
  res.redirect('/posts'); // preferred!
});

// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/posts');
});


 /*
  * JSON API Endpoints
  */

  app.get('/api', controllers.api.index);
  app.get('/api/users', controllers.user.index);
  app.delete('/api/users/:id', controllers.user.destroy);
  app.delete('/api/users/:user_id/trips/:trip_id', controllers.trip.destroy);
  app.post('/api/users/:user_id/trips', controllers.trip.create);
  app.put('/api/users/:user_id/trips/:trip_id', controllers.trip.update);
  app.get('/api/users/search', controllers.user.search);
  app.post('/api/users', controllers.user.create);
  app.get('/api/users/:id', controllers.user.show);

  /**********
 * SERVER *
 **********/

  // listen on port 3000
  app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is running on http://localhost:3000/');
  });
