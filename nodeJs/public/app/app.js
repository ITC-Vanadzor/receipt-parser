var app = angular.module("app", ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.

    when('/resetpassword', {
        templateUrl: '/view/src/htm/resetPassword.htm',
        controller: 'signInController'
    }).

    when('/signup', {
        templateUrl: '/view/src/htm/signUp.htm',
        controller: 'signInController'
    }).
    when('/forgotpassword', {
        templateUrl: '/view/src/htm/forgotPassword.htm',
        controller: 'signInController'
    }).
    when('/signin', {

        templateUrl: '/view/src/htm/signIn.htm',
        controller: 'signInController'

    }).
    when('/usage', {

        templateUrl: '/view/src/usage.html',
        controller: 'usageController'

    }).
    when('/profile', {

        templateUrl: '/view/src/profile.html',
        controller: 'indexCtl'

    }).
    when('/statistic', {

        templateUrl: '/view/src/statistic.html',
        controller: 'indexCtl'

    }).
    otherwise({
        templateUrl: '/view/src/home.html',
        controller: 'indexCtl'
    });

}]);