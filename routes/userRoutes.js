var express = require('express');
var router = express.Router();
var User = require("../Models/UserModel");
var passport = require('passport');

router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send({username:req.user.username});
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send({username:req.user.username})
});

router.get('/currentUser', function(req, res) {
  if (req.user) {
    res.send({username:req.user.username})
  } else {
    res.send(null)
  }
});

router.get('/logout', function(req, res) {
 req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

module.exports = router;
