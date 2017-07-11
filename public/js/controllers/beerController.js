app.controller('beerController', function ($scope, $stateParams, beerFactory) {
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
            'name': $scope.user
        }
        var beerid = $stateParams.id


        beerFactory.addReview(review, beerid).then(function (beer) {
               
        }).catch(function (error) {
            console.log(error)
        });
        $scope.review = ''
        $scope.user = ''
    }

})