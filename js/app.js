// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var StarWarsApp = angular.module('StarWarsApp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform, $rootScope, $location) {

  $rootScope.goHome = function () {
    $location.path('/list');
  }

  $ionicPlatform.ready(function () {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


StarWarsApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/list', {
      controller: 'ListController',
      templateUrl: 'partials/list.html'
    })
    .when('/details/:itemId', {
      controller: 'DetailsController',
      templateUrl: 'partials/details.html'
    })
    .otherwise({redirectTo: '/list'});
}]);


StarWarsApp.controller('ListController', ['$scope', '$http', '$ionicLoading', function ($scope, $http, $ionicLoading) {
  $scope.loadlist = function () {
    $ionicLoading.show();
    $http.get("http://swapi.co/api/films/?format=json")
    .success(function (response) {
      $scope.results = response.results;
      $ionicLoading.hide();
    })
    .finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.loadlist();
}]);


StarWarsApp.controller('DetailsController', ['$scope', '$http', '$routeParams', '$ionicLoading', function ($scope, $http , $routeParams, $ionicLoading) {
  $ionicLoading.show();
  $http.get("http://swapi.co/api/films/?format=json")
  .success(function (response) {
    $scope.title = response.results[$routeParams.itemId].title;
    $scope.date = response.results[$routeParams.itemId].release_date;
    $scope.intro = response.results[$routeParams.itemId].opening_crawl;
    $ionicLoading.hide();
  });
}]);
