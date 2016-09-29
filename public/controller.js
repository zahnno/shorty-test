var app = angular.module('shorty', []);

app.controller('urlCtrl', function($scope, $http) {

$scope.addUrl = function(){
    $http.post('/shorten',{url: $scope.url, shortcode: $scope.shortcode}).success(function(response){
        console.log(response.shortcode);
    })
}
});