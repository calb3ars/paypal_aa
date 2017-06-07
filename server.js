//  Base setup
//  ================================================================================

//  connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://andrew:admin@ds111622.mlab.com:11622/andrewpp');

var Bear = require('./app/models/bear');

//  call packages we need
var express  = require('express');
var app = express();
var bodyParser = require('body-parser'); // allows us to grab data from POST

//  configure app with bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  // set port


//  Routes
//  ================================================================================
//  Configure API Routes
var router = express.Router();

//  middleware for all requests
router.use(function(req, res, next) {
  console.log("Activity on the server");
  // test request
  // throw errors
  // analytics
  // statistics

  next(); // make sure we continue to the next routes
});

//  Routes for Bear model
router.route('/bears')
  .post(function(req, res) {

    var bear = new Bear();  // new instance of Bear
    bear.name = req.body.name;  // set the Bear's name from the request

    bear.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: 'Bear created!'
        });
      }
    });

  });

//  GET request to test API
router.get('/', function(req, res) {
  res.json({ message: 'GET request successful'});
});

//  More Routes

//  Prefix routes with /api
app.use('/api', router);

//  Start server
app.listen(port);
console.log(`App listening on port ${port}`);
