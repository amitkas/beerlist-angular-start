  app.controller('mainController', function ($scope, beerFactory) {



      $scope.addBeer = function (beer) {
          var newBeer = {
              name: $scope.name,
              style: $scope.style,
              abv: $scope.abv,
              image_url: $scope.image
          };

          beerFactory.addBeer(newBeer).then(function (beer) {
              $scope.beers.push(beer);
          }).catch(function (error) {
              console.log(error)
          });
      }

      $scope.removeBeer = function () {
          beerFactory.removeBeer(this.beer._id).then(function (beer) {
              for (var i = 0; i < $scope.beers.length; i++) {
                  if ($scope.beers[i]._id === beer._id) {
                      $scope.beers.splice(i, 1);
                      break;
                  }
              }
          }).catch(function (error) {
              console.log(error)
          });
      }

      beerFactory.getBeers().then(function (beers) {
              $scope.beers = beers;
          })
          .catch(function (error) {
              console.log(error)
          });


      $scope.rateBeer = function (rate) {
          var newrate = rate
          beerId = this.beer._id
          beerFactory.rateBeer(beerId, newrate).then(function (beer) {

              for (var i = 0; i < $scope.beers.length; i++) {
                  if ($scope.beers[i]._id === beer._id) {
                      $scope.beers[i] = beer;
                      break;
                  }
              }

          }).catch(function (error) {
              console.log(error)
          });
      }

      $scope.setOrder = function (order) {
          $scope.order = order;
      };

  })