'use strict';

var fragment = {};

/**
 * Returns true if the passed object is not null nor undefined.
 *
 * @param mixed obj
 * @return boolean
 */
function isSet(obj) {
    return (typeof obj !== 'undefined' && obj !== null);
}
fragment.isSet = isSet;

/**
 * Returns if the type of the object is a string.
 *
 * @param mixed obj
 * @return boolean
 */
function isString(obj) {
	return typeof obj === 'string';
}
fragment.isString = isString;
