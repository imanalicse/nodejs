// require and instantiate express
var app = require('express')()

var index = require('./routes/index');
var posts = require('./routes/posts');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/posts', posts);

app.listen(3000);

console.log('listening on port 3000');
