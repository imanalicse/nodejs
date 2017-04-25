var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

//build the REST operations at the base for products
//this will be accessible from http://127.0.0.1:3000/products if the default route for / is left unchanged
router.route('/')
    //GET all products
    .get(function(req, res, next) {
        //retrieve all products from Monogo
        mongoose.model('Product').find({}, function (err, products) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    html: function(){
                        res.render('products/index', {
                            title: 'All Products',
                            "products" : products
                        });
                    },
                    //JSON response will show all products in JSON format
                    json: function(){
                        res.json(products);
                    }
                });
            }
        });
    })
    //POST a new blob
    .post(function(req, res) {
        console.log(req.body);
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var description = req.body.description;
        //call the create function for our database
        mongoose.model('Product').create({
            name : name,
            description : description
        }, function (err, product) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Blob has been created
                console.log('POST creating new blob: ' + product);
                res.format({
                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("products");
                        // And forward to success page
                        res.redirect("/products");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(product);
                    }
                });
            }
        })
    });

/* GET New Product page. */
router.get('/new', function(req, res) {
    res.render('products/new', { title: 'Add New Product' });
});

module.exports = router;