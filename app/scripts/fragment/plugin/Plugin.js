/**
 * Base of all plugins.
 *
 * @author Emil Johansson <emiljohansson.se@gmail.com>
 */
define([], function() {
	'use strict';

	/**
	 * Constructor method.
	 */
	function Plugin() {
		this._list = [];
	}

	/**
	 * Adds an element to the list.
	 *
	 * @param Element element
	 * @return undefined
	 */
	Plugin.prototype.add = function(element) {
		this._list.push(element);
		this._initElement(element);
	};

	/**
	 * Appends the plugin onto the element.
	 *
	 * @param Element element
	 * @return undefined
	 */
	Plugin.prototype._initElement = function(element) {};

	return Plugin;
});
