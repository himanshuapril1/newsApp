'use strict';
var myApp = angular.module('myApp', ['ui.router', 'ngMaterial']);
var apiCallUri = 'http://www.pravinasafety.com/services/get-news.php?uri=';
myApp.controller('MainController', ['$scope', '$http', '$mdSidenav','$sce', function ($scope, $http, $mdSidenav,$sce) {
        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
        $http({
            url: 'js/url-data.js',
            method: 'GET'
        }).then(function (response) {
            $scope.navLists = response.data;
            $scope.topStory = response.data[0]['items'][0]['datauri'];
        }, function (response) {
            $scope.navLists = response.data;
        });
        $scope.toggleOpt = function(a){
            $scope.toggleOptns[a] = !$scope.toggleOptns[a];
        };
}]).config(function($sceProvider) {
	$sceProvider.enabled(false);
});

myApp.controller('HomeController', ['$scope', '$http','$sce', function ($scope, $http, $sce) {
	$scope.uriLink = 'racstopstories';
		$http({
			url: apiCallUri + $scope.uriLink,
			method: 'POST'
		}).then(function (response) {
			$scope.news = response.data;
			$scope.status = response.status;
		}, function (response) {
			$scope.news = response.data;
	});
}]);

myApp.controller('ArticleController', ['$scope', '$http','$sce','$stateParams', function ($scope, $http, $sce,$stateParams) {
		var uriLink = $stateParams.id;
		
		$scope.news_cat = $stateParams.page;
		$http({
			url: apiCallUri + uriLink,
			method: 'POST'
		}).then(function (response) {
			$scope.news = response.data;
			$scope.status = response.status;
		}, function (response) {
			$scope.news = response.data;
	});
}]);

myApp.controller('ArticleDetailsController', ['$scope', '$http','$sce','$stateParams', function ($scope, $http, $sce,$stateParams) {
	
}]);

myApp.filter('spaceless', function () {
    return function (input) {
        if (input) {
            return input.replace(/\s+/g, '-');
        }
    }
});
myApp.filter('unsafeHTML',function($sce){
	return function(input){
		return $sce.trustAsHtml(input);
	}
});
myApp.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
            .primaryPalette('indigo');
    $mdThemingProvider.theme('accent')
            .accentPalette('purple'); // specify primary color, all
    // other color intentions will be inherited
    // from default
});
myApp.config(function ($stateProvider, $urlRouterProvider) {
    
	// For any unmatched url, redirect to /Home
    $urlRouterProvider.otherwise("/Home");
	
    // Now set up the states
    $stateProvider
	.state('Home', {
		url: "/Home",
		templateUrl: "tmpls/main.html",
		controller: 'HomeController'
	})
	.state('Category', {
		url: "/:cat/:page/:id",
		templateUrl: "tmpls/main.html",
		controller:'ArticleController'
	})
	.state('Category.article', {
		url: "/Details/:uri",
		templateUrl: "tmpls/article-display.html",
		controller:'ArticleDetailsController'
	});
});
