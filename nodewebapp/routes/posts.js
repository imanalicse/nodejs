var express = require('express');
var app = express();
var router = express.Router();



// fake posts to simulate a database
var posts = [
  {
    id: 1,
    author: 'John',
    title: 'Templating with EJS',
    body: 'Blog post number 1'
  },
  {
    id: 2,
    author: 'Drake',
    title: 'Express: Starting from the Bottom',
    body: 'Blog post number 2'
  },
  {
    id: 3,
    author: 'Emma',
    title: 'Streams',
    body: 'Blog post number 3'
  },
  {
    id: 4,
    author: 'Cody',
    title: 'Events',
    body: 'Blog post number 4'
  }
]

//console.log(posts);

// blog home page
router.route('/')
    //GET all products
    .get(function(req, res) {
  // render `home.ejs` with the list of posts
  res.render('posts/index', { posts: posts })
});


// route middleware to validate :id
router.param('id', function(req, res, next, id) {
      req.id = id;
      next();
});

// blog post
router.route('/:id').get(function(req, res){
 // find the post in the `posts` array
  console.log(req);

  res.render('posts/post', {
    author: 'a',
    title: 'b',
    body: 'ddddd'
  });

});

 // render the `post.ejs` template with the post content
 /* res.render('posts/post', {
   author: post.author,
   title: post.title,
   body: post.body
   });*/


module.exports = router;
