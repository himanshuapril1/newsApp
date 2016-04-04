'use strict';
var myApp = angular.module('myApp', ['ui.router', 'ngMaterial']);

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
        $scope.uriLink = 'rssfeedstopstories';
        $scope.toggleOpt = function(a){
            $scope.toggleOptns[a] = !$scope.toggleOptns[a];
        };
		
		/***
		
		var newsData = function () {
            $mdSidenav('left').toggle();
            $http({
                url: 'services/get-news.php?uri=' + $scope.uriLink,
                method: 'POST'
            }).then(function (response) {
                $scope.news = response.data;
                $scope.status = response.status;
            }, function (response) {
                $scope.news = response.data;
            });
        };
        newsData();
        $scope.getData = function (cat, uri) {
            $scope.news = '';
            $scope.news_cat = cat;
            if (uri) {
                $scope.uriLink =  uri;
            } else {
                $scope.uriLink =  $scope.topStory;
            }
            newsData();
        }
		
		*/
    }])
	.config(function($sceProvider) {

  $sceProvider.enabled(false);
});

myApp.controller('HomeController', ['$scope', '$http','$sce', function ($scope, $http, $sce) {
	$scope.uriLink = 'rssfeedstopstories';
		$http({
			url: 'services/get-news.php?uri=' + $scope.uriLink,
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
			url: 'services/get-news.php?uri=' + uriLink,
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
