var express = require('express');
var router = express.Router();
var Beer = require("../models/BeerModel");

//the beer routes go here

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status('401').send({message: "Unauthorized" });
  }
};

router.get('/', function (req, res, next) {
  Beer.find(function (error, beers) {
    if (error) {
      return next(error);
    } else {
      return res.send(beers);
    }
  });
});

router.post('/', ensureAuthenticated, function (req, res, next) {
  Beer.create(req.body, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
});

router.delete('/:beerId', ensureAuthenticated, function (req, res, next) {
  Beer.findByIdAndRemove(req.params.beerId, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
});

///get the beer for the new route

router.get('/:beerId', function (req, res) {
  Beer.findById(req.params.beerId, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
});

router.post('/:beerid/review', function (req, res, next) {
  console.log(req.body)
  Beer.findById(req.params.beerid, function (err, data) {
    if (err) {
      throw err
    } else {
      data.review.push(req.body)
      data.save(function (err, data) {
        if (err) {
          console.error(err);
        } else {
          res.send(data)
        }
      })
    }
  })
})

router.post('/:beerId/ratings', function (req, res, next) {
  var updateObject = {
    $push: {
      ratings: req.body.ratings
    }
  };

  Beer.findByIdAndUpdate(req.params.beerId, updateObject, {
    new: true
  }, function (err, beer) {
    if (err) {
      return next(err);
    } else {
      res.send(beer);
    }
  });
});



// router.put('/:id', ensureAuthenticated, function(req, res, next) {
//   //Find beer and update
// });

module.exports = router;

