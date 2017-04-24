var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3000/blobs if the default route for / is left unchanged
router.route('/')
    //GET all blobs
    .get(function(req, res, next) {
      //retrieve all blobs from Monogo
      mongoose.model('Blob').find({}, function (err, blobs) {
        if (err) {
          return console.error(err);
        } else {
          //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
          res.format({
            //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
            html: function(){
              res.render('blobs/index', {
                title: 'All my Blobs',
                "blobs" : blobs
              });
            },
            //JSON response will show all blobs in JSON format
            json: function(){
              res.json(infophotos);
            }
          });
        }
      });
    })
    //POST a new blob
    .post(function(req, res) {
      // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
      var name = req.body.name;
      var badge = req.body.badge;
      var dob = req.body.dob;
      var company = req.body.company;
      var isloved = req.body.isloved;
      //call the create function for our database
      mongoose.model('Blob').create({
        name : name,
        badge : badge,
        dob : dob,
        isloved : isloved
      }, function (err, blob) {
        if (err) {
          res.send("There was a problem adding the information to the database.");
        } else {
          //Blob has been created
          console.log('POST creating new blob: ' + blob);
          res.format({
            //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
            html: function(){
              // If it worked, set the header so the address bar doesn't still say /adduser
              res.location("blobs");
              // And forward to success page
              res.redirect("/blobs");
            },
            //JSON response will show the newly created blob
            json: function(){
              res.json(blob);
            }
          });
        }
      })
    });