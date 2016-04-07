var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */


 app.get('/', function homepage (req, res) {
   res.sendFile(__dirname + '/views/index.html');
 });

 app.get('/post', function homepage (req, res) {
   res.sendFile(__dirname + '/views/post.html');
 });

 /*
  * JSON API Endpoints
  */

  app.get('/api', controllers.api.index);



  /**********
 * SERVER *
 **********/

  // listen on port 3000
  app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is running on http://localhost:3000/');
  });
