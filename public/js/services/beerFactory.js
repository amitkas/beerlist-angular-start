
app.factory('beerFactory', function ($http) {

  var beerFactory = {};


beerFactory.getBeers = function() {
  return $http.get('/beers')
    .then(function(response) {
      return angular.copy(response.data);
    });
};


  beerFactory.addBeer = function(newBeer) {
return $http.post('/beers', newBeer).then(function (response) {
    return angular.copy(response.data);
  });
  }

  beerFactory.addReview = function(review, beerid){
      return $http.post('/beers/'+beerid+'/review/', review).then(function (response){
        return angular.copy(response.data)
      })
  }

  beerFactory.removeBeer = function(beerId) {
      return $http.delete('/beers/'+beerId).then(function (response) {
    return angular.copy(response.data);
  });
  }

///script to get a specific beer from API

 beerFactory.getaBeer = function(beerId) {
      return $http.get('/beers/'+beerId).then(function (response) {
    return angular.copy(response.data);
  });
}


  beerFactory.rateBeer = function(beerId, newrate) {
      var rating = {ratings: newrate}
return $http.post('/beers/'+beerId+'/ratings', rating).then(function (response) {
    return angular.copy(response.data);
  });
  }
  return beerFactory;

})
