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

<<<<<<< HEAD
    /**
     * Returns if the type of the object is a string.
     *
     * @param mixed obj
     * @return boolean
     */
	fragment.isString = function(obj) {
		return typeof obj === 'string';
	};

	window.fragment = fragment;
	return fragment;
});
=======
/**
 * Returns if the type of the object is a string.
 *
 * @param mixed obj
 * @return boolean
 */
fragment.isString = function(obj) {
	return typeof obj === 'string';
};
>>>>>>> origin/no-requirejs
