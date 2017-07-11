var app = angular.module('beerList', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'mainController',
            templateUrl: '/templates/home.html'
        })
        .state('beer', {
            url: '/beer/:id',
            controller: 'beerController',
            templateUrl: '/templates/beer.html',
            params: {
                beerParam: null
            }
        })

        .state('register', {
            url: '/register',
            templateUrl: '/templates/register.html',
            controller: 'AuthCtrl'
        })

    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(true);


}]);