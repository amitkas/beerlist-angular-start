var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session')

mongoose.connect('mongodb://localhost/beers', function () {
  console.log("DB connection established!!!");
})

var beerRoutes = require('./routes/beerRoutes');
var userRoutes = require('./routes/userRoutes');


var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy()); //Thanks to p-l-m there is no need to create a local strategy
passport.serializeUser(User.serializeUser()); //also it helps here
passport.deserializeUser(User.deserializeUser()); //and here


app.use('/beers', beerRoutes);
app.use('/users', userRoutes);



app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// error handler to catch 404 and forward to main error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});