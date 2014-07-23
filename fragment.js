/**
 * ...
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
require.config({
	paths: {
		'hammerjs': 'fragment/lib/hammerjs/hammer',
		'soundjs': 'fragment/lib/SoundJS/lib/soundjs-0.5.2.min',
		'preloadjs': 'fragment/lib/PreloadJS/lib/preloadjs-0.4.1.min'
	},
	shim: {},
	priority: []
});

define([
	'hammerjs', 'soundjs', 'preloadjs'
], function() {
	'use strict';

	var fragment = {};

    /**
     * Returns true if the passed object is not null nor undefined.
     *
     * @param mixed obj
     * @return boolean
     */
    fragment.isSet = function(obj) {
        return (typeof obj !== 'undefined' && obj !== null);
    };

    /**
     * Returns if the type of the object is a string.
     *
     * @param mixed obj
     * @return boolean
     */
	fragment.isString = function(obj) {
		return typeof obj === 'string';
	};

	return fragment;
});
