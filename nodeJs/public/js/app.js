  var app = angular.module('myApp', ['ngRoute','ngMaterial', 'ngMessages', 'material.svgAssetsCache']);


  app.config(['$routeProvider', function($routeProvider) {
      $routeProvider.

      when('/', {
          templateUrl: '/src/html/menubar.html',
          controller: 'toolBarCtl'
      })
  }]);
