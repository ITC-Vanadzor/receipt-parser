var app = angular.module("app", ['ngRoute','ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/resetPassword', {
      templateUrl: './htm/resetPassword.htm', 
      controller: 'signInController'
   }).
   
   when('/signUp', {
        templateUrl: './htm/signUp.htm', 
  controller: 'signInController'
   }).
    when('/forgotPassword', {
        templateUrl: './htm/forgotPassword.htm', 
      controller: 'signInController'
   }).
   when('/signIn',{
  templateUrl: './htm/signIn.htm',
  controller: 'signInController'

   }).
   otherwise({
               redirectTo: '/signIn'
            });
  
}]);