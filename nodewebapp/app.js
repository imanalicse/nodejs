// require and instantiate express
const app = require('express')()

var routes = require('./routes/index');
var posts = require('./routes/posts');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/posts', posts);


// blog post
app.get('/posts/:id', function(req, res){
  // render the `post.ejs` template with the post content
    res.render('posts/post', {
        author: 'a',
        title: 'b',
        body: 'ddddd'
    });
});

app.listen(3000)

console.log('listening on port 3000')
