var app = angular.module("app", ['ngProgress','ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/resetPassword', {
      templateUrl: '/AngularJs/src/resetPassword.htm', 
      controller: 'signInController'
   }).
   
   when('/signUp', {
      	templateUrl: '/AngularJs/src/signUp.htm', 
	controller: 'signInController'
   }).
    when('/forgotPassword', {
      	templateUrl: '/AngularJs/src/forgotPassword.htm', 
     	controller: 'signInController'
   }).
   when('/signIn',{
	templateUrl: '/AngularJs/src/signIn.htm',
	controller: 'signInController'

   }).
   otherwise({
               redirectTo: '/signIn'
            });
	
}]);
