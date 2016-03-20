  var app = angular.module('myApp', ['ngRoute']);


  app.config(['$routeProvider', function($routeProvider) {
      $routeProvider.

      when('/', {
          templateUrl: '/src/html/menubar.html',
          controller: 'myCtrl'
      })
  }]);