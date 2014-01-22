/* Controllers */

var supernovaApp = angular.module('supernovaApp', []);


supernovaApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
 $http.get('user').success(function(data) {
    $scope.phones = data;
  });
}]);

/*
phonecatApp.controller('PhoneListCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('user').success(function(data) {
      $scope.phones = data;
    });
  }]);

*/

/*phonecatApp.controller('PhoneListCtrl', function($scope) {
 

  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});
*/