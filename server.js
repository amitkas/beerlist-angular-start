var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beers', function () {
  console.log("DB connection established!!!");
})

var Beer = require('./beerModel');


var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));




app.get('/beers', function (req, res, next) {
  Beer.find(function (error, beers) {
    if (error) {
      return next(error);
    } else {
      return res.send(beers);
    }
  });
});

app.post('/beers', function (req, res) {
  Beer.create(req.body, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
});

app.delete('/beers/:beerId', function (req, res) {
  Beer.findByIdAndRemove(req.params.beerId, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
});

///get the beer for the new route

app.get('/beers/:beerId', function (req, res) {
  Beer.findById(req.params.beerId, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  });
});



app.post('/beers/:beerid/review', function (req, res, next) {
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


app.post('/beers/:beerId/ratings', function (req, res, next) {
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

// app.post('/beers/:id/reviews', function (req, res, next) {
//   var update = {
//     $push: {
//       reviews: req.body
//     }
//   };
//   Beer.findByIdAndUpdate(req.params.beerid, update, {
//     new: true
//   }, function (err, beer) {
//     if (err) {
//       return next(err);
//     } else {
//       res.send(beer);
//     }
//   });
// });

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