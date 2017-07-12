app.controller('masterController', function($scope, $state, authFactory,$rootScope){

$rootScope.currentUser = authFactory.currentUser

authFactory.getCurrentUser().then(function(){
})

    $scope.logout = function () {
        authFactory.logout().then(function () {
                $state.go('home');
            },
            function (err) {
                alert(err.data)
            })
    }

})