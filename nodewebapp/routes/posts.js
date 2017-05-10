var express = require('express');
var app = express();
var router = express.Router();



// fake posts to simulate a database
var posts = [
  {
    id: 1,
    author: 'John',
    title: 'Templating with EJS',
    body: 'Blog post number 1',
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

console.log(posts[0]);

// blog home page
router.route('/')
    .get(function(req, res) {
  res.render('posts/index', { posts: posts })
});

router.route('/:id').get(function(req, res){
    //console.log(req.params.id);
    var post = posts[0];
    res.render('posts/post', {
        author: post.author,
        title: post.title,
        body: post.body
    })

 });

module.exports = router;
