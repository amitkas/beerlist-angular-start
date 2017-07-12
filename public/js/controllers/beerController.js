app.controller('beerController', function ($scope, $stateParams, beerFactory, $rootScope) {
    if (!$stateParams.beerParam) {
        beerFactory.getaBeer($stateParams.id)
            .then(function (beer) {
                $scope.beer = beer;
                console.log($scope.beer)

            })
    } else {
        $scope.beer = $stateParams.beerParam;
    }

    $scope.addReview = function () {
        var review = {
            'text': $scope.review,
            'name': $rootScope.currentUser.username
        }
        var beerid = $stateParams.id


        beerFactory.addReview(review, beerid).then(function (beer) {
            console.log(beer)
            $scope.beer = beer
        }).catch(function (error) {
            console.log(error)
        });
        $scope.review = ''
        $scope.user = ''
    }



})