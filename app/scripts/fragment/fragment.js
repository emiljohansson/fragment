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
