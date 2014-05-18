/**
 * ...
 *
 * https://github.com/emiljohansson/fragment
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([], function() {
	'use strict';

	var fragment = {};

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