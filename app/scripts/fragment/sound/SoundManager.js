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
	function SoundManager() {
		this._list = [];
	}

	/**
	 * Adds an element to the list.
	 *
	 * @param Element element
	 * @return undefined
	 */
	SoundManager.prototype.addFile = function(fileName) {
		//
	};

	/**
	 * Appends the SoundManager onto the element.
	 *
	 * @param Element element
	 * @return undefined
	 */
	SoundManager.prototype.initElement = function(element) {};

	return SoundManager;
});