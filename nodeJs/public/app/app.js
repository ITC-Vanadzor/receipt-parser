var app = angular.module("app", ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache','ngTable']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.

    when('/usage', {

        templateUrl: '/view/src/htm/usage.htm',
        controller: 'usageController'

    }).
    when('/download', {

        templateUrl: '/view/src/htm/download.htm',
        controller: 'indexCtl'

    }).
    when('/about', {

        templateUrl: '/view/src/htm/about.htm',
        controller: 'indexCtl'

    }).
    when('/signin', {

        templateUrl: '/view/src/htm/signin.htm',
        controller: 'signInController'

    }).
    when('/signup', {

        templateUrl: '/view/src/htm/signup.htm',
        controller: 'signInController'

    }).
    when('/forgotpassword', {

        templateUrl: '/view/src/htm/forgotpassword.htm',
        controller: 'signInController'

    }).
    when('/loginError', {

        templateUrl: '/view/src/htm/signin.htm',
        controller: 'signInController'

    }).
    when('/registerError', {

        templateUrl: '/view/src/htm/signup.htm',
        controller: 'signInController'

    }).
    otherwise({
        templateUrl: '/view/src/htm/home.htm',
        controller: 'indexCtl'
    });

}]);
