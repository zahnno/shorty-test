var app = angular.module('shorty', []);

app.controller('urlCtrl', function($scope, $http, $timeout) {

    $scope.addUrl = function(){
        $http.post('/shorten',{url: $scope.url, shortcode: $scope.shortcode}).success(function(response){
            $scope.short_url = response.shortcode;
        })
        .error(function(data, status){
            $scope.error = data.error;
            $scope.showMessage = true;
        
            $timeout(function() {
                $scope.showMessage = false;
            }, 3000);
        });
    }
});