/**
 * Routing
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([
    'angular',
    'app'
], function(angular, app) {
	'use strict';

	return app.module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			controller: 'MyGameController'
		});
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);
});
