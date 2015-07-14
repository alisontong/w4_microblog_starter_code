// SERVER-SIDE JAVASCRIPT

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    _ = require("underscore");

mongoose.connect('mongodb://localhost/test');
var Post = require('./models/post');


// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));


// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));


// Posts

// pre-seeded post data
var posts =[
  {id: 1, author: "Alan", text: "Hiked 8 miles this weekend! Finally made it out to the waterfall."},
  {id: 3, author: "Celeste", text: "On the other side of the cloud, a silver lining."},
  {id: 2, author: "Bette", text: "Garden starting to produce veggies! Best tomato ever."},
  {id: 4, author: "Daniel", text: "Been relearning geometry to help niece -- owning triangles so hard right now."},
  {id: 5, author: "Evelyn", text: "We need team jackets!"}
];
var totalPostCount = 9;

 
// ROUTES

// Static file route(s)

// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

//get all posts
app.get('/api/posts', function (req, res) {
  // send all posts as JSON response
  Post.find(function(err,posts){
    res.json(posts);
  });
});

// create new post
app.post('/api/posts', function (req, res) {
  // grab params (author and text) from form data
  var newPost = new Post({
    text: req.body.text,
    author:req.body.author
  });
  newPost.save(function(err,savedPost){
    res.json(savedPost);
  });
});
  
//get one
app.get('/api/posts/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find phrase in db by id
  Post.findOne({_id: targetId}, function (err, foundPost) {
    res.json(foundPost);
  });
});

// update single post
app.put('/api/posts/:id', function(req, res) {

  // take the value of the id from the url parameter
  var targetId = req.params.id;

  Post.findOne({_id:targetId},function(err,foundBook){
    foundBook.title = req.body.title;
    foundBook.author = req.body.author;

    foundBook.save(function(err,savedBook){
      res.json(savedBook);
    });
  });
});

// delete post
app.delete('/api/posts/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find phrase in db by id and remove
  Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
    res.json(deletedPost);
  });
});

//set server to localhost:3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});