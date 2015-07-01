'use strict';

angular.module('netrisApp', ["netrisRender", "ngRoute"])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/views/netris.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});