/**
 * The startingpoing.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
require.config({
    paths: {
        angular: '../../bower_components/angular/angular',
        angularRoute: '../../bower_components/angular-route/angular-route',
        angularMocks: '../../bower_components/angular-mocks/angular-mocks',
        jquery: '../../bower_components/jquery/dist/jquery.js',
        lodash: '../../bower_components/lodash/dist/lodash.compat.js',
        hammer: '../../bower_components/hammerjs/hammer.js'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        }
    },
    priority: [
        'angular'
    ]
});

require([
    'angular',
    'app',
    'routes'
], function(angular, app) {
    'use strict';

    //var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        app.ready();
    });
});
