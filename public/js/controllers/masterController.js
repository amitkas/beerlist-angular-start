app.controller('masterController', function($scope, authFactory){

$scope.currentUser = authFactory.currentUser

authFactory.getCurrentUser().then(function(){
})


})