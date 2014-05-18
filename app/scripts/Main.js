/**
 * The startingpoing.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
require.config({
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'lodash': '../../bower_components/lodash/dist/lodash.compat',
        'hammer': '../../bower_components/hammerjs/hammer'
    },
    shim: {},
    priority: []
});

require([
    'app',
    'jquery'
], function(app, jquery) {
    'use strict';

    jquery(document).ready(function() {
        app.ready();
    });
});
