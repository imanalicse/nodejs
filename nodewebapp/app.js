// require and instantiate express
const app = require('express')()

var routes = require('./routes/index');
var posts = require('./routes/posts');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/posts', posts);


// blog post
app.get('/post/:id', function(req, res){
  // find the post in the `posts` array
  /*const post = posts.filter((post) => {
    return post.id == req.params.id
  })[0]*/

  // render the `post.ejs` template with the post content
    res.render('posts/post', {
        author: 'a',
        title: 'b',
        body: 'ddddd'
    });
});

app.listen(3000)

console.log('listening on port 3000')
