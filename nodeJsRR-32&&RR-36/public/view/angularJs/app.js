var app = angular.module("app", ['ngProgress','ngRoute']);

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
