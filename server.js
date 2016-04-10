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


 app.get('/', function homepage (req, res) {
   res.sendFile(__dirname + '/views/index.html');
 });

 app.get('/posts', function homepage (req, res) {
   res.sendFile(__dirname + '/views/post.html');
 });

//signup form
 app.get('/signup', function (req, res) {
  res.render('signup');
});

//show login view
app.get('/login', function (req, res) {
  res.render('login'); // you can also use res.sendFile
});

app.get('/', function (req, res) {
    res.render('index', {user: JSON.stingify(req.user) + " || null"});
});
/*
 * AUTH ROUTES
 */


// sign up new user, then log them in , hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        // res.send('signed up!!!');
        res.redirect('/');
      });
    }
  );
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  // res.send('logged in!!!'); // sanity check
  res.redirect('/'); // preferred!
});

// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});


 /*
  * JSON API Endpoints
  */

  app.get('/api', controllers.api.index);
  app.get('/api/posts', controllers.post.index);
  app.delete('/api/posts/:id', controllers.post.destroy);
  app.delete('/api/posts/:post_id/trips/:trip_id', controllers.trip.destroy);
  app.post('/api/posts/:post_id/trips', controllers.trip.create);
  app.put('/api/posts/:post_id/trips/:trip_id', controllers.trip.update);
  app.get('/api/posts/search', controllers.post.search);
  // app.post('/signup', controllers.user.create);

  /**********
 * SERVER *
 **********/

  // listen on port 3000
  app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is running on http://localhost:3000/');
  });
